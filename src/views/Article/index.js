import React, { Component } from 'react'
import {Card,Button,Table,Tag,Modal,Typography,Tooltip } from "antd"
import {getArticle,deleteArticleById} from "../../request"
import moment from "moment"
import XLSX from "xlsx"
const {Text} = Typography
const ButtonGroup = Button.Group;
const titleDisplayMap = {
  "id":"id",
  "article":"班级",
  "amount":"平均成绩",
  "author":"姓名",
  "time":"年级"
}
export default class ArticleList extends Component {
    state = {
      dataSource:[],
      columns:[],
      total:0,
      isLoading:false,
      s:0,  //开始的条数
      limited:10, //每一页的数量
      deleteArticleTitle:"",
      isDeleteArticleModelShow:false,
      isDeleteArticleId:"",
      deleteArticleConfirmLoading:false
    }
    createColumns = (columnKeys)=>{
      const colums = columnKeys.map(item=>{ //item=["id","title","amount","author","currentAt"]
        if(item==="amount"){
          return {
            title: titleDisplayMap[item],
            key: item,
            //这边根据阅读量的大小去做条件渲染
            //如果对某一列里面的数据单独处理，就不需要dataIndex
            //大于220红色  小于220的绿色

            //总经理 001  经理002   主管003
            //const titleMap = {001:"red",002:"blue",003:"yellow"}
            //<Tag color={titleMap[titleKey]}>{record.name}</Tag>
            render:(text, record, index)=>{
                const {amount} = record
                return (
                  <Tooltip  placement="bottomRight" title={amount>=60?'及格':'不及格'}>
                    <Tag color={amount<60?'red':'green'}>{amount}</Tag>
                  </Tooltip>
                )
            }
          }
        }
        if(item==="currentAt"){
          return {
            title: titleDisplayMap[item],
            key: item,
            render:(text,record)=>{
              let {currentAt} = record;
              return moment(currentAt).format("YYYY年MM月DD日 HH:mm:ss")
            }
          }
        }
        return {
          title: titleDisplayMap[item],
          dataIndex: item,
          key: item,
        }
      })

      //往列的数组里面再去添加一列
      colums.push({
        title:"操作",
        key: "action",
        render:(text,record)=>{
          return (
            <ButtonGroup>
              <Button onClick={this.toEdit.bind(this,record.id)} size="small" type="primary">编辑</Button>
              <Button onClick={this.showDeleteArticleModel.bind(this,record)} size="small" type="danger">删除</Button>
            </ButtonGroup>
          )
        }
      })

      return colums;
    }

    toEdit = (id)=>{
      this.props.history.push(`/admin/article/edit/${id}`)
      // this.props.history.push({
      //   pathname:`/admin/article/edit/${record.id}`,
      //   state:{
      //     title:record.title
      //   }
      // })

    }
  
    showDeleteArticleModel = (record)=>{
      // 弹出对话框  但是考虑到细节  点击确定的时候弹框里面也消失了
      // Modal.confirm({
      //   title:"注意!",
      //   content: <Text>确定要删除<Text type="danger">{record.title}</Text>吗？</Text>,
      //   onOk:()=>{
      //     deleteArticleById(record.id).then(res=>{
      //       console.log("res",res)
      //     })
      //   }
      // })

      //更改组件状态
      this.setState({
        deleteArticleTitle:<Text>确定要删除<Text type="danger">{record.title}</Text>吗？</Text>,
        isDeleteArticleModelShow:true,
        isDeleteArticleId:record.id
      })

    }

    getData = ()=>{
      //加载loading
      this.setState({isLoading:true})
      getArticle(this.state.offset,this.state.limited).then(res=>{
        const columnKeys = Object.keys(res.list[0])
        const columns = this.createColumns(columnKeys)
        this.setState({
          total:res.total,
          columns,
          dataSource:res.list
        })
      }).catch(err=>{

      }).finally(()=>{
        this.setState({isLoading:false})
      })
    }
    componentDidMount(){
      this.getData()
    }
    onChange = (page, pageSize)=>{
      this.setState({
        offset:pageSize*(page-1), //0-9 10-19  20-29
        limited:pageSize
      },()=>{
        this.getData()
      })
    }
    onShowSizeChange = (current, size)=>{
      this.setState({
        offset:0,
        limited:size
      },()=>{
        this.getData()
      })
    }
    toExcel = ()=>{
      const data = [Object.keys(this.state.dataSource[0])];//data=[[id,title,...]]
      for(var i=0;i<this.state.dataSource.length;i++){
        // data.push(Object.values(this.state.dataSource[i]))
        data.push([
          this.state.dataSource[i].id,
          this.state.dataSource[i].title,
          this.state.dataSource[i].author,
          this.state.dataSource[i].amount,
          moment(this.state.dataSource[i].currentAt).format("YYYY年MM月DD日 HH:mm:ss")
        ])
      }
      const ws = XLSX.utils.aoa_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
      XLSX.writeFile(wb, `sheet-${this.state.offset / this.state.limited +1}.xlsx`)
    }
    onCancel = ()=>{
      this.setState({
        deleteArticleTitle:"",
        isDeleteArticleModelShow:false
      })
    }
    onOk = ()=>{
      // console.log(this.state.isDeleteArticleId)
      this.setState({deleteArticleConfirmLoading:true})
      deleteArticleById(this.state.isDeleteArticleId)
        .then(res=>{
          // alert(res)
          //需要跟产品经理进行协调
          this.setState({
            offset:0
          },()=>{
            this.getData()  
          })
        }).finally(()=>{
          this.setState({
            deleteArticleConfirmLoading:false,
            isDeleteArticleModelShow:false
          })
        })
    }
    render() {
        return (
            <div>
                <Card 
                    title="文章列表" 
                    extra={<Button onClick={this.toExcel}>Excel导出</Button>} 
                >
                    <Table 
                      rowKey={record=>record.id}
                      dataSource={this.state.dataSource} 
                      columns={this.state.columns} 
                      loading={this.state.isLoading}
                      pagination={{
                        total:this.state.total,
                        hideOnSinglePage:true,
                        showQuickJumper:true,
                        showSizeChanger:true,
                        onChange:this.onChange,
                        onShowSizeChange:this.onShowSizeChange,
                        current: this.state.offset / this.state.limited +1,
                        pageSizeOptions:['10','15','20','25']
                      }}
                    />;
                    <Modal
                      visible={this.state.isDeleteArticleModelShow}
                      title={"警告！此操作不可逆"}
                      cancelText={"点错了，再看看"}
                      okText={"拜拜~"}
                      onCancel={this.onCancel}
                      onOk={this.onOk}
                      confirmLoading={this.state.deleteArticleConfirmLoading}
                    >
                     {this.state.deleteArticleTitle}
                    </Modal>
                </Card>
            </div>
        )
    }
}
