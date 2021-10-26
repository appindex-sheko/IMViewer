## Updating AWS Lambda

Compile javascript as typescript

```
cd aws_lambda
npm install

```

compile typescript
zip entire folder's contents (NOT THE FOLDER ITSELF) as "bundle.zip"
upload to AWS lambda

e.g. in powershell 
```
npm run compile
$path = "./"
$exclude = @("*.zip")
$files = Get-ChildItem -Path $path -Exclude $exclude
Compress-Archive -Force -Path $files bundle.zip
aws lambda update-function-code --function-name search --zip-file fileb://bundle.zip

```



## Setup AWS

Install Amazon CLI 

```
msiexec.exe /i https://awscli.amazonaws.com/AWSCLIV2.msi              

```

Check if AWS CLI is correctly installed
```
aws --version
```

If "aws" is not recognised: add aws as an environment variable see: https://docs.aws.amazon.com/cli/latest/userguide/install-windows.html#awscli-install-windows-path

install packages
''' 
npm install typescript --save-dev
''' 

configure AWS with access KEY ID + KEY
```
aws configure
```



## Usage

See Postman Collection
