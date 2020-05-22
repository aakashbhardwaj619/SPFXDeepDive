import * as React from 'react';
import styles from './ListItems.module.scss';
import { IListItemsProps } from './IListItemsProps';
import { IListItemsState } from './IListItemsState';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import Header from '../components/Header';

export default class ListItems extends React.Component<IListItemsProps, IListItemsState> {
  constructor(props: IListItemsProps) {
    super(props);

    this.state = {
      listItems: [],
      newItemTitle: ''
    };
  }

  public componentDidMount() {
    this.getListItems();
  }

  public componentDidUpdate(prevProps: IListItemsProps) {
    if (this.props.listName !== prevProps.listName) {
      this.getListItems();
    }
  }

  private getListItems() {
    this.props.SPServiceInstance.GetListItems(this.props.listName).then((listItems) => {
      this.setState({ listItems, newItemTitle: '' });
    });
  }

  private addListItem = () => {
    this.props.SPServiceInstance.AddListItems(this.props.listName, this.state.newItemTitle).then((result) => {
      this.getListItems();
    });
  }

  public render(): React.ReactElement<IListItemsProps> {
    return (
      <div className={styles.listItems}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <Header />
              <TextField label='New Item Title' value={this.state.newItemTitle} onChange={(ev, val) => { this.setState({ newItemTitle: val }); }} /><br />
              <PrimaryButton text='Add' onClick={this.addListItem} />
              <br /><br />
              <span className={styles.title}>{this.props.listName}</span>
              <ul>
                {this.state.listItems.map((item, index) => {
                  return <li key={index}> {item.Title} </li>;
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
