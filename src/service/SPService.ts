import { sp } from '@pnp/sp';
import '@pnp/sp/webs';
import '@pnp/sp/lists';
import '@pnp/sp/items';
import { IItemAddResult } from '@pnp/sp/items';
import { ISPService } from './ISPService';

export class SPService implements ISPService {
  /**
   * Get items from a list
   * @param listName List Name
   */
  public async GetListItems(listName: string): Promise<any[]> {
    let listItems: any[] = [];

    try {
      listItems = await sp.web.lists.getByTitle(listName).items.select('Title').get();
    } catch (error) { }

    return listItems;
  }

  /**
   * Add new item to list
   * @param listName List Name
   * @param title Item Title
   * @param answer Item Answer
   */
  public async AddListItems(listName: string, title: string): Promise<IItemAddResult> {
    let result: IItemAddResult;

    try {
      result = await sp.web.lists.getByTitle(listName).items.add({
        Title: title
      });
    } catch (error) { }

    return result;
  }
}