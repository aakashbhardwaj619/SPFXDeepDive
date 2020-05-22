import { ISPService } from './ISPService';

export class SPServiceMock implements ISPService {
  /**
   * Get items from a list
   * @param listName List Name
   */
  public async GetListItems(listName: string): Promise<any[]> {
    const listItems: any[] = [
      {
        Title: 'Test 1'
      },
      {
        Title: 'Test 2'
      },
      {
        Title: 'Test 3'
      }
    ];
    
    return listItems;
  }

  /**
   * Add new item to list
   * @param listName List Name
   * @param title Item Title
   * @param answer Item Answer
   */
  public async AddListItems(listName: string, title: string): Promise<any> {
    const result: any = {
      data: {},
      item: {}
    };

    return result;
  }
}