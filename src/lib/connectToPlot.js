import React, {Component} from 'react';
import PropTypes from 'prop-types';
import unpackPlotProps from './unpackPlotProps';

export default function connectToPlot(BaseComponent) {
  class PlotConnectedComponent extends Component {
    constructor(props, context) {
      super(props);

      this.setLocals(props, context);
    }

    componentWillReceiveProps(nextProps, nextContext) {
      this.setLocals(nextProps, nextContext);
    }

    setLocals(props, context) {
      if (props.plotProps) {
        // Sections analyze children, iterate over them to unpack the props,
        // and then send those props to the children. If they're available,
        // then they don't need to be recomputed:
        this.plotProps = props.plotProps;
      } else {
        // Otherwise, this is just a bare component (not in a section) and it needs
        // processing:
        this.plotProps = unpackPlotProps(props, context);
      }
    }

    render() {
      const props = Object.assign({}, this.props, this.plotProps);
      if (props.isVisible) {
        return <BaseComponent {...props} />;
      } else {
        return null;
      }
    }
  }

  PlotConnectedComponent.contextTypes = {
    data: PropTypes.array,
    fullData: PropTypes.array,
    fullLayout: PropTypes.object,
    fullTraceIndex: PropTypes.number,
    graphDiv: PropTypes.any,
    layout: PropTypes.object,
    onUpdate: PropTypes.func,
    plotSchema: PropTypes.object,
    traceIndex: PropTypes.number,
  };

  return PlotConnectedComponent;
}