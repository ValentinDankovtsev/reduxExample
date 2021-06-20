export type Action = {
  [key: string]: any;
};

export type State = any;
export type Reducer = (state: State | undefined, action: Action) => State;

export interface IStore {
  /**
   *
   * @param action  - Обработка изменений state после использования action
   * @returns - ничего не возвращает
   */
  dispatch(action: Action): void;
  /**
   *- оповещаем подписчиков об измнении
   * @param callback  функция, которая будет вызывается каждый раз после обновления store.
   * @returns - функцию unsubscribe(). Которая позволяет «отписаться от обновления»
   */
  subscribe(callback: Function): Function;
  /**
   *
   * @returns Возвращает  состояние State -
   *          после использования reducer
   */
  getState(): State;
  /**
   * Заменяет редюсер, который в настоящее время используется стором, чтобы вычислить состояние.
   * @param nextReducer  Следующий редюсер для стора который будет использован.
   * @returns - ничего не возвращает
   */
  replaceReducer(nextReducer: Reducer): void;
}

export type newState = any;

export type Reducers = {
  [key: string]: any;
};
