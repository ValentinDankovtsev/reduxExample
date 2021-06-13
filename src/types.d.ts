/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */

declare type Action = {
  type?: string;
  text?: string;
  id?: number;
};

declare type State = any;
type Reducer = (state: State | undefined, action: Action) => State;

declare interface IStore {
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

declare type newState = any;

declare type Reducers = {
  [key: string]: any;
};
