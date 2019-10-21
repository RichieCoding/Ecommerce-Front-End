import React, { Component } from "react";
import "./filter-component.styles.scss";

export class FilterComponent extends Component {
  state = {
    itemChecked: {}
  };

  handleCheckboxChange = (e) => {
    let itemChecked = this.state.itemChecked;
    itemChecked[e.target.name] = e.target.checked
    this.setState({itemChecked})
    this.props.handleFilter(this.state.itemChecked)
  }


  render() {
    const renderCategories = this.props.categories.map((category, index) => {
      return (
        <div className='input-container'>
          <label>
          <input
            key={index}
            type='checkbox'
            name={category}
            // value={this.state.category}
            id={category}
            onChange={this.handleCheckboxChange}
          />
          <span>{category}</span>
          </label>
        </div>
      );
    });
    return (
      <div className='filter-component'>
        <div className='filter-wrapper'>
          <form className='category' >
            <p className='filter-title'>Category</p>
            {renderCategories}
            {this.state.itemChecked['Funko'] ? <p>hello</p> : null}
            {this.state.itemChecked['Accessories'] ? <p>hello</p> : null}
          </form>
        </div>
      </div>
    );
  }
}

export default FilterComponent;
