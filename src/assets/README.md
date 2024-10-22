# Create the public key/private key
openssl genrsa -out <privatekey> 2048
openssl rsa -in <privatekey> -outform PEM -pubout -out <publickey>

```
openssl genrsa -out src/assests/access_token.private.key 2048
openssl rsa -in src/assests/access_token.private.key -outform PEM -pubout -out src/assests/access_token.public.key
openssl genrsa -out src/assests/refresh_token.private.key 2048
openssl rsa -in src/assests/refresh_token.private.key -outform PEM -pubout -out src/assests/refresh_token.public.key
```
