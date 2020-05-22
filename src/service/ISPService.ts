export interface ISPService {
  /**
   * Get items from a list
   * @param listName List Name
   */
  GetListItems(listName: string): Promise<any[]>;

  /**
   * Add new item to list
   * @param listName List Name
   * @param title Item Title
   * @param answer Item Answer
   */
  AddListItems(listName: string, title: string): Promise<any>;
}