ARQUIVOS IMPORTANTES DESSE REPOSITORIO: nginx.conf e Dockerfile!

docker build -f Dockerfile -t cassio/apimoney .

docker run -d -p 8000:4200 cassio/apimoney .
