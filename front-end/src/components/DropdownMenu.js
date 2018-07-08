import React, { Component } from 'react'
import { Spring } from 'react-spring'

class DropdownMenu extends Component {
  state = {
    open: false,
  }

  toggle = (e) => {
    this.setState({ open: !this.state.open })
  }

  render() {
    const { options } = this.props
    const { open } = this.state
    return (
      <div className='menu' style={{ cursor: "pointer", position: "relative", textAlign: "right" }} onClick={this.toggle}>
        <svg width="28" height="6" viewBox="0 0 28 6" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="2.76571" cy="2.51282" rx="2.76571" ry="2.51282" fill="#4F4F4F"/>
          <ellipse cx="2.76571" cy="2.51282" rx="2.76571" ry="2.51282" transform="translate(11.0628)" fill="#4F4F4F"/>
          <ellipse cx="2.76571" cy="2.51282" rx="2.76571" ry="2.51282" transform="translate(22.1257)" fill="#4F4F4F"/>
        </svg>
        <Spring
          to={{ opacity: open ? 1 : 0 }}
          children={(style) =>
            <div
              style={{
                ...style,
                position: "absolute",
                right: "0",
                top: "30px",
                background: "white",
                padding: ".5rem 0",
                boxShadow: "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)",
                fontSize: '1.2rem',
                fontWeight: '700',
              }}
            >
              {options.map(
                ({ label, action }) =>
                  <div
                    style={{
                      padding: ".5rem 1.5rem"
                    }}
                    onClick={action}
                    key={`dropdown-${label}`}
                  >{label}</div>
              )}
            </div>
          }
          />
      </div>
    )
  }
}

export default DropdownMenu
