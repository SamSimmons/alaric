import React, { Component, Fragment } from 'react'
import { get } from 'lodash'

class Overlay extends Component {
  state = {
    paint: false,
    radius: 30,
    circles: [],
  }

  canvas = null


  getMousePos(e) {
      var rect = this.canvas.getBoundingClientRect();
      return {
          x: (e.clientX - rect.left) / (rect.right - rect.left) * rect.width,
          y: (e.clientY - rect.top) / (rect.bottom - rect.top) * rect.height
      };
  }

  mouseDown = (e) => {
    const { x, y } = this.getMousePos(e)
    this.setState({ paint: true })
    let context = this.canvas.getContext("2d")
    context.strokeStyle = "rgba(180, 10, 190, .3)"
    context.lineJoin = "round"
    context.lineWidth = 5
    context.beginPath()
    context.arc(x, y, this.state.radius, 0, 2 * Math.PI)
    context.stroke()
  }

  svgDown = (e) => {
    const { radius } = this.state
    const { x, y } = this.getMousePos(e)
    const point = { x, y, radius, style: { fill: 'rgba(180, 20, 230, .3)'} }
    this.setState({
      circles: this.state.circles.concat(point)
    })
  }


  render () {
    const { width, height } = this.props.dimensions
    return (
      <Fragment>
        {
          // <canvas
          //   height={height - 40}
          //   width={width}
          //   ref={(elt) => this.canvas = elt}
          //   onMouseDown={this.mouseDown}
          //   onMouseUp={() => this.setState({ paint: false })}
          //   onMouseLeave={() => this.setState({ paint: false })}
          //   className='clip__overlay'
          // />
        }
        <svg
          style={{
            position: 'absolute',
            zIndex: 2,
            top: '1rem',
            left: '1rem',
          }}
          height={height - 40}
          width={width}
          ref={(elt) => this.canvas = elt}
          onMouseDown={this.svgDown}
        >
          {this.state.circles.map(({ x, y, radius, style }, i) => {
            return <circle key={`point-${i}`} cx={x} cy={y} r={radius} style={style} />
          })}
        </svg>
        <div>{get(this.props.video, 'current.currentTime', '')}</div>
      </Fragment>
    )
  }
}

export default Overlay
