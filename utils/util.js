import {
  API
} from './api';

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
const shareMsg = {
  title: "美华保险",
  content: '美华保险',
  imageUrl: "/images/share.jpg"
};


const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
module.exports = {
  formatTime: formatTime
}
