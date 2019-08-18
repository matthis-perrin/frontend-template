import {throwStatement} from '@babel/types';
import React from 'react';

// tslint:disable-next-line:typedef
export function ParamWizz<State, Props, DerivedStateFromProps>(
  getDerivedState: (state: State | undefined, props: Props) => DerivedStateFromProps | undefined
) {
  type WizzInternalProps = Props & {
    children(derivedState: DerivedStateFromProps): JSX.Element | JSX.Element[];
    loader?: JSX.Element;
  };

  interface WizzInternalState {
    derivedState: DerivedStateFromProps | undefined;
  }

  class WizzInternal extends React.Component<WizzInternalProps, WizzInternalState> {
    private static state: State | undefined;
    private static readonly listeners: (() => void)[] = [];

    private elementWasMounted: boolean = false;
    private shouldRecomputeOnMount: boolean = false;

    public static setState(newState: State): void {
      WizzInternal.state = newState;
      for (const listener of WizzInternal.listeners) {
        listener();
      }
    }

    public static getState(): State | undefined {
      return WizzInternal.state;
    }

    public constructor(props: WizzInternalProps) {
      super(props);
      this.state = {derivedState: getDerivedState(undefined, props)};
      WizzInternal.listeners.push(this.recomputeState);
    }

    public componentDidMount(): void {
      this.elementWasMounted = true;
      if (this.shouldRecomputeOnMount) {
        this.shouldRecomputeOnMount = false;
        this.recomputeState();
      }
    }

    public componentWillUnmount(): void {
      this.elementWasMounted = false;

      const listenerIndex = WizzInternal.listeners.indexOf(this.recomputeState);
      if (listenerIndex === -1) {
        return;
      }
      WizzInternal.listeners.splice(listenerIndex, 1);
    }

    public shouldComponentUpdate(
      prevProps: WizzInternalProps,
      prevState: WizzInternalState
    ): boolean {
      // TODO - check if prevProps (beside children or loader) or prevState.derivedState have changed
      return true;
    }

    private readonly recomputeState = (): void => {
      if (this.elementWasMounted) {
        const derivedState = getDerivedState(WizzInternal.state, this.props);
        this.setState({derivedState});
      } else {
        this.shouldRecomputeOnMount = true;
      }
    };

    public render(): JSX.Element | JSX.Element[] {
      const {children, loader} = this.props;
      const {derivedState} = this.state;
      if (!derivedState) {
        if (!loader) {
          return <React.Fragment />;
        }
        return loader as JSX.Element;
      }
      return children(derivedState);
    }
  }
  return WizzInternal;
}

// tslint:disable-next-line:typedef
export function Wizz<State>(initialState?: State) {
  return ParamWizz((state: State | undefined, props: {}) => state || initialState);
}