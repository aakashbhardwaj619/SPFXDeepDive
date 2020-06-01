echo 'Adding App Package'
app=$(o365 spo app add --filePath ${{ env.packagePath }} --scope sitecollection --appCatalogUrl ${{ env.siteUrl }})
echo 'Deploying App'
o365 spo app deploy --id $app --scope sitecollection --appCatalogUrl ${{ env.siteUrl }}
