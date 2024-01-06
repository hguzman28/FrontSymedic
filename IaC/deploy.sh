#/bin/bash


rm -fr ../build

npm run build

terraform apply -auto-approve