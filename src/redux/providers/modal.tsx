import React from 'react';

interface IModalContext {
  component: React.ElementType | null;
  props: ModalPropsType;
  showModal: (component: React.ElementType, props: ModalPropsType) => void;
  hideModal: () => void;
}

interface IModalProps {
  children: Element[];
  value?: IModalContext;
}

type ModalPropsType = any;

export const ModalContext = React.createContext<IModalContext>({
  component: null,
  props: {},
  showModal: (_component, _props) => {},
  hideModal: () => {},
});

const ModalConsumer = ModalContext.Consumer;
const Provider = ModalContext.Provider;

export const ModalProvider: React.FunctionComponent<IModalProps> = ({
  children,
}): React.ReactElement<IModalProps> => {
  const showModal: IModalContext['showModal'] = React.useCallback(
    (component, props = {}): void => {
      setModalState({
        component,
        props,
        showModal,
        hideModal,
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const hideModal: IModalContext['hideModal'] = React.useCallback(
    () =>
      setModalState({
        component: null,
        props: {},
        showModal,
        hideModal,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const [modalState, setModalState] = React.useState<IModalContext>({
    component: null,
    props: {},
    showModal,
    hideModal,
  });

  return <Provider value={modalState}>{children}</Provider>;
};

export const ModalRoot = () => (
  <ModalConsumer>
    {({component: Component, props}) =>
      Component ? <Component {...props} /> : null
    }
  </ModalConsumer>
);
