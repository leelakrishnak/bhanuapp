import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { folderOpen, file } from 'react-icons-kit/fa/';
import { Icon } from 'react-icons-kit';
import { List, Tooltip, Typography } from 'antd';
import moment from 'moment';
import './listfiles.css';
import { sliceBigString } from './utils';

const { Text, Link } = Typography;

class ListFileItem extends Component {
  onClickFolder = ({ path }) => {
    this.props.folderClicked(path);
  };

  render() {
    const { item } = this.props;

    return (
      <List.Item>
        <Tooltip placement='topLeft' title={item.path}>
          <div className='file-item'>
            {item.isDir ? (
              <span>
                {' '}
                <Link onClick={() => this.onClickFolder(item)}>
                  <Icon icon={folderOpen} /> {sliceBigString(item.name)}{' '}
                </Link>
              </span>
            ) : (
              <span>
                {' '}
                <Icon icon={file} /> {sliceBigString(item.name)}{' '}
              </span>
            )}

            <Text type='secondary'>
              {moment(item.createdOn).format('YYYY-MM-DD hh:mm')}
            </Text>

            <Text type='secondary'>{item.size} bytes</Text>
          </div>
        </Tooltip>
      </List.Item>
    );
  }
}

ListFileItem.propTypes = {
  item: PropTypes.object.isRequired,
  folderClicked: PropTypes.func.isRequired,
};

export default ListFileItem;
