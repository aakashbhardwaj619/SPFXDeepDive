echo 'Adding App Package'
echo '$siteUrl'
app=$(o365 spo app add --filePath $packagePath --scope sitecollection --appCatalogUrl $siteUrl )
echo 'Deploying App'
o365 spo app deploy --id $app --scope sitecollection --appCatalogUrl $siteUrl
