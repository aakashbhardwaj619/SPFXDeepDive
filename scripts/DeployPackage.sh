#!/bin/bash

# requires jq: https://stedolan.github.io/jq/

#componentSiteUrl="https://in8aakbh.sharepoint.com/sites/AppIndex"
#componentList="LEGOWeb Component Deployment"
#componentTitle="LEGOWeb-RatingCard"
#environment="TEST"
#packagePath="test-list-items.sppkg"

componentSiteUrl=$componentSiteUrl
componentList=$componentList
componentTitle=$componentTitle
environment=$environment
packagePath=$packagePath


sites=()

while read component; do
  sites+=($component)
done < <(o365 spo listitem list --title "$componentList" --webUrl $componentSiteUrl --filter "Environment eq '$environment' and Component eq '$componentTitle'" --fields "Title" --output json | jq -r '.[] | .Title')

echo "Deployment to begin"

for siteUrl in "${sites[@]}"; do
  echo "Site URL: $siteUrl"
  app=$(o365 spo app add --filePath $packagePath --scope sitecollection --appCatalogUrl $siteUrl --overwrite)
  echo "App ID: $app"
  o365 spo app deploy --id $app --scope sitecollection --appCatalogUrl $siteUrl
  appInfo=$(o365 spo app get --id $app --scope sitecollection --appCatalogUrl $siteUrl --output json)
  appVersion=$(echo $appInfo | jq -r '.InstalledVersion')
  appCanUpgrade=$(echo $appInfo | jq -r '.CanUpgrade')

  if [[ "$appCanUpgrade" = "true" ]]; then
    echo "Upgrading App"
    spo app upgrade --id $app --siteUrl $siteUrl --scope sitecollection
  fi
  if [ -z "$appVersion" ]; then
    echo "Installing app"
    o365 spo app install --id $app --siteUrl $siteUrl --scope sitecollection
  fi
done
