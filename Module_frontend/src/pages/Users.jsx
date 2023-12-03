import React, { useState, useEffect } from "react";
import Table from "../components/table/Table";
// import customerList from "../assets/JsonData/customers-list.json";
import NavCard from "../components/UserManagerment/navcard/NavUser";
import Sort from "../components/sort/Sort";
import Operation from "../components/operation/Operation";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {fetchUsers} from '../redux/slices/UserSlice'

const customerTableHead = ["", "name", "email", "phone"];
const renderHead = (item, index) => <th key={index}>{item}</th>;
const operationData = [
  { icon: "bx bxs-user-detail", name: "Chi tiết người dùng" },
  { icon: "bx bx-trash", name: "Sửa thông tin người dùng" },

  { icon: "bx bx-trash", name: "Xóa người dùng" },
];

const sortBy = [
  { name: "", value: "Sắp xếp" },
  { name: "name", value: "Sắp xếp theo tên" },
  { name: "id", value: "Sắp mã id" },
];

const Users = () => {
  const history = useHistory()
  const [sort, setSort] = useState("");
  const handleOperationClick = (item, userData) => {
    // Xử lý thông tin người dùng và mục operation khi một mục trong danh sách được chọn
    console.log("Thông tin người dùng:", userData);
    console.log("Mục operation:", item.name);
    

    // Thực hiện các hành động tùy thuộc vào mục operation
    if (item.name === "Chi tiết người dùng") {

      console.log("ckeck user data",userData);
      history.push(`/admin/user/viewUser/${userData.id}`);
      
    } else if (item.name === "Sửa thông tin người dùng") {
      console.log("ckeck user data",userData);
      history.push(`/admin/user/editUser/${userData.id}`)
      
    } else if (item.name === "Xóa người dùng") {

    }
  };
  const renderBody = (item, index) => (
    <tr key={index}>
      <td>{item.id}</td>
      <td>{item.name}</td>
      <td>{item.email}</td>
      <td style={{ display: "flex" }}>
        <div style={{ width: "60%" }}>{item.phone}</div>
        <Operation
          operation={operationData}
          userData={item}
          onOperationClick={handleOperationClick}
        ></Operation>
      </td>
    </tr>
  );

  const dispatch = useDispatch();
  const {data, loading} = useSelector((state) => state.users);
  console.log ("users: " , data);
  const customerList = data;
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
  if(loading){
    return (<h2>Lodaing</h2>)
  }
  // console.log ("users: " , users);
  const handleChange = (event) => {
    setSort(event.target.value);
    // if (event.target.value === "name") {
    //   const sortedList = [...list].sort((a, b) => a.name.localeCompare(b.name));
    //   setList(sortedList);
    // } else if (event.target.value === "id") {
    //   const sortedList = [...list].sort((a, b) => a.id - b.id);
    //   setList(sortedList);
    // }
  };
  return (
    <div>
      <h2 className="page-header">Quản lý tài khoản</h2>
      <div className="row">
        <div className="col-10" style={{ margin: "auto" }}>
          <div className="card">
            <div className="card-header">
              <NavCard></NavCard>
            </div>
            <div style={{ margin: "auto", padding: "0 40px" }}>
              <Sort
                handleChange={handleChange}
                sort={sort}
                sortBy={sortBy}
              ></Sort>
            </div>
            <div style={{ margin: "0 40px" }} className="card__body">
              <Table
                limit="6"
                headData={customerTableHead}
                renderHead={(item, index) => renderHead(item, index)}
                bodyData={customerList}
                renderBody={(item, index) => renderBody(item, index)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
