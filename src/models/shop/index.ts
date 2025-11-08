export interface ShopState {
  listOptions: Record<string, unknown>;
  selectedListOptions: [];
  filterCount: number;
  queryString: string;
  sortString: string;
  isSortingApllied: boolean;
  userPhoneNumber: string;
  snackBarVisible: boolean;
  productValueComms: ValueCommItems[];
}

export interface ValueCommItems {
  compareAtPrice: number;
  imageUrl?: string;
  price: number;
  title: string;
  subHeader?: string;
}
export enum ShopActionTypes {
  SET_USER_PHONE = 'SET_USER_PHONE',
  SET_SNACK_BAR_VISIBLE = 'SET_SNACK_BAR_VISIBLE',
  SET_SEARCH_PARAMETERS = 'SET_SEARCH_PARAMETERS',
  SET_VALUE_COMMUNICATIONS = 'SET_VALUE_COMMUNICATIONS'
}

export type ShopActions =
  {
      type: ShopActionTypes.SET_USER_PHONE;
      payload: string;
    }
  | {
      type: ShopActionTypes.SET_SNACK_BAR_VISIBLE;
      payload: boolean;
    }
  | {
      type: ShopActionTypes.SET_SEARCH_PARAMETERS;
      payload: boolean;
    }
  | {
    type: ShopActionTypes.SET_VALUE_COMMUNICATIONS;
    payload: ValueCommItems[];
  };

export type ShopReducerType = (
  state: ShopState,
  action: ShopActions,
) => ShopState;

export type ShopDispatch = React.Dispatch<ShopActions>;
