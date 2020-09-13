import React, { Component } from 'react';
import { getAllFiles } from './api';
import { List, message, Typography, Button } from 'antd';
import './listfiles.css';
import Filters from './Filters';
import ListFileItem from './ListFileItem';
import { angleDoubleUp } from 'react-icons-kit/fa/angleDoubleUp';
import { Icon } from 'react-icons-kit';

const { Text } = Typography;

class ListFiles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true,
      homeDirectory: '/',
      cwd: '/',
    };
  }

  goBack = () => {
    let { cwd } = this.state;

    if (cwd.charAt(cwd.length - 1) === '/') {
      cwd = cwd.substr(0, cwd.length - 1);
    }

    if (cwd.lastIndexOf('/') !== -1) {
      cwd = cwd.substr(0, cwd.lastIndexOf('/') + 1);
      this.getData({ directory: cwd });
      this.setState({ cwd: cwd });
    }
  };

  folderClicked = (path) => {
    this.setState({ cwd: path });
    this.getData({ directory: path });
  };

  componentDidMount() {
    const {
      location: { pathname },
    } = this.props;

    this.getData({ directory: pathname });
  }

  getData = (args) => {
    this.setState({ loading: true });
    getAllFiles(args)
      .then((response) => {
        // console.log(response);
        this.setState({ data: response.data });
      })
      .catch((error) => {
        console.log(error);
        message.error('Failed to fetch data');
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  };

  render() {
    const { loading, data, cwd } = this.state;

    return (
      <>
        <div className='list-container'>
          <Filters data={data}>
            {({ files }) => {
              return (
                <List
                  size='small'
                  header={
                    <div>
                      <Button
                        shape='circle'
                        onClick={this.goBack}
                        icon={<Icon icon={angleDoubleUp} />}
                        style={{ marginRight: '5px' }}
                      />

                      <Text type='secondary'>Current Directory: {cwd}</Text>
                    </div>
                  }
                  bordered={true}
                  loading={loading}
                  dataSource={files}
                  locale={{ emptyText: 'Directory is empty' }}
                  renderItem={(item) => (
                    <ListFileItem
                      item={item}
                      folderClicked={this.folderClicked}
                    />
                  )}
                />
              );
            }}
          </Filters>
        </div>
      </>
    );
  }
}

export default ListFiles;
