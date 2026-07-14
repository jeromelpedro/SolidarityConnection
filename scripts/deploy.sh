#!/bin/sh
# Sobe a aplicacao no Docker sempre com a versao correta, e confirma no fim
# qual versao ficou realmente em execucao.
#
#   ./scripts/deploy.sh                 constroi do codigo-fonte local (padrao)
#   ./scripts/deploy.sh --ghcr          baixa as imagens publicadas pelo CI
#   ./scripts/deploy.sh --ghcr 1.1.0    baixa uma versao especifica (rollback)
#
# Sem isto e facil o Compose subir uma versao e o repositorio estar em outra:
# o .env nao vem no git pull, entao ele precisa ser ressincronizado com VERSION.

set -e

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

MODE="local"
VERSION=""

for arg in "$@"; do
  case "$arg" in
    --ghcr) MODE="ghcr" ;;
    --local) MODE="local" ;;
    -*) echo "Opcao desconhecida: $arg" >&2; exit 1 ;;
    *) VERSION="$arg" ;;
  esac
done

# Sem versao explicita, o arquivo VERSION manda (fonte unica de verdade).
if [ -z "$VERSION" ]; then
  VERSION=$(tr -d '[:space:]' < VERSION)
fi

echo "Versao alvo: $VERSION  (modo: $MODE)"
echo

# Mantem .env, package.json e kustomization alinhados com a versao alvo.
sh scripts/set-version.sh "$VERSION" > /dev/null
echo "APP_VERSION=$VERSION" > .env

SERVICES="api worker frontend"

if [ "$MODE" = "ghcr" ]; then
  COMPOSE="docker compose -f docker-compose.yml -f docker-compose.ghcr.yml"

  echo "Baixando imagens publicadas do GHCR..."
  $COMPOSE pull $SERVICES
else
  COMPOSE="docker compose"

  echo "Construindo imagens a partir do codigo-fonte..."
  $COMPOSE build $SERVICES
fi

echo
echo "Subindo containers..."
$COMPOSE up -d $SERVICES

echo
printf "Aguardando a API ficar saudavel"

i=0
while [ $i -lt 40 ]; do
  STATUS=$(docker inspect solidarity-api --format '{{.State.Health.Status}}' 2>/dev/null || echo "starting")

  if [ "$STATUS" = "healthy" ]; then
    echo " OK"
    break
  fi

  printf "."
  sleep 5
  i=$((i + 1))
done

echo
echo "================ EM EXECUCAO ================"

RUNNING=$(curl -s http://localhost:8080/version 2>/dev/null || echo "")

echo "  API      : ${RUNNING:-sem resposta}"
docker logs solidarity-worker 2>&1 | grep -i "versao" | tail -1 | sed 's/^/  Worker   : /'
echo "  Frontend : http://localhost:3001"
echo

# A validacao que importa: a versao no ar e a versao alvo?
if echo "$RUNNING" | grep -q "\"version\":\"$VERSION\""; then
  echo "OK: a versao em execucao ($VERSION) confere com a versao alvo."
else
  echo "ATENCAO: a versao em execucao NAO confere com $VERSION." >&2
  exit 1
fi
