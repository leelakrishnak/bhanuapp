import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, Select } from 'antd';
import './listfiles.css';
const { Search } = Input;
const { Option } = Select;

class Filters extends Component {
  state = {
    filters: {},
  };

  handleChange = (value) => {
    console.log(`selected ${value}`);
    const { filters } = this.state;
    filters.sortBy = value;
    this.setState({ filters: filters });
  };

  onSearch = (value) => {
    console.log(value);
    const { filters } = this.state;
    filters.search = value.toLowerCase();
    this.setState({ filters: filters });
  };

  filterData = (data) => {
    let { filters = {} } = this.state;
    if (filters.search) {
      data = data.filter((item) =>
        item.name.toLowerCase().includes(filters.search)
      );
    }

    if (filters.sortBy) {
      if (filters.sortBy === 'folders') {
        data = data.sort((a, b) => {
          return (b.isDir ? 1 : 0) - (a.isDir ? 1 : 0);
        });
      } else if (filters.sortBy === 'files') {
        data = data.sort((a, b) => {
          return (!b.isDir ? 1 : 0) - (!a.isDir ? 1 : 0);
        });
      } else if (filters.sortBy === 'atoz') {
        data = data.sort((a, b) => {
          if (a.name > b.name) {
            return 1;
          } else if (a.name < b.name) {
            return -1;
          } else return 0;
        });
      }
    }
    console.log(filters, data);
    return data;
  };

  render() {
    //const { data } = this.props;
    const data = this.filterData(this.props.data);
    return (
      <>
        <div className='filter-container'>
          <Select
            size='large'
            placeholder='Sort By'
            style={{ width: 200 }}
            onChange={this.handleChange}
          >
            <Option value='files'>Files First</Option>
            <Option value='folders'>Folders First</Option>
            <Option value='atoz'>A to Z</Option>
          </Select>

          <Search
            placeholder='Input File or Folder name'
            enterButton='Search'
            allowClear
            size='large'
            onSearch={this.onSearch}
          />
        </div>
        {this.props.children({
          files: data,
        })}
      </>
    );
  }
}

Filters.propTypes = {
  data: PropTypes.array,
};

export default Filters;
