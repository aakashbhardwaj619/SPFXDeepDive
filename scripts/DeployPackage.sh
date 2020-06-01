echo "Adding App Package $packagePath on $siteUrl"
packagePath=$packagePath
siteUrl=$siteUrl
app=$(o365 spo app add --filePath $packagePath --scope sitecollection --appCatalogUrl $siteUrl)
echo "$app"
echo "Deploying App $packagePath on $siteUrl"
o365 spo app deploy --id $app --scope sitecollection --appCatalogUrl $siteUrl
