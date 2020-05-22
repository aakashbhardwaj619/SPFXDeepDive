import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'ListItemsWebPartStrings';
import ListItems from './components/ListItems';
import { IListItemsProps } from './components/IListItemsProps';

import { sp } from '@pnp/sp';
import { SPService } from '../../service/SPService';

export interface IListItemsWebPartProps {
  description: string;
  listName: string;
}

export default class ListItemsWebPart extends BaseClientSideWebPart <IListItemsWebPartProps> {
  private SPServiceInstance: SPService;

  public render(): void {
    const element: React.ReactElement<IListItemsProps> = React.createElement(
      ListItems,
      {
        description: this.properties.description,
        listName: this.properties.listName,
        SPServiceInstance: this.SPServiceInstance
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected async onInit() {
    await super.onInit();

    this.SPServiceInstance = new SPService();
    sp.setup(this.context);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneTextField('listName', {
                  label: 'List Name'
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
