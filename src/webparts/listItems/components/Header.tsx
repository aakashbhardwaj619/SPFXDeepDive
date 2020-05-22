import * as React from 'react';

export interface IHeaderProps {}

export interface IHeaderState {}

export default class Header extends React.Component<IHeaderProps, IHeaderState> {
  public render(): React.ReactElement<IHeaderProps> {
    return (
      <div>
        <h1>Welcome to the Demo</h1>
      </div>
    );
  }
}
