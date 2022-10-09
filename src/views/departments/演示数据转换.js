const apiData = [
  // 后端程序员输出数据
  { id: 1, name: '人事部', pid: '' },
  { id: 2, name: '技术部', pid: '' },
  { id: 3, name: '前端开发', pid: 2 },
  { id: 4, name: '行政部', pid: '' }
]

const uiData = [
  // 组件库需求的数据
  { id: 1, name: '人事部', pid: '' },
  { id: 2, name: '技术部', pid: '', children: [{ id: 3, name: '前端开发', pid: 2 }] },
  { id: 4, name: '行政部', pid: '' }
]

// 我们希望写个函数, 进行数据的转换
// 基本逻辑, 就是由一个旧数组, 有一个id,跟着这个id筛选数组

function listToTree(list, id) {
  // 定义空数组作为结果
  const res = []
  list.forEach(item => {
    // 判断如果那个元素的 pid 跟传入的筛选条件相同, 放入结果数组中
    if (item.pid === id) {
      // 这里满足了筛选条件, 属于结果的一部分
      res.push(item)
      // 但是, 每个满足条件的部门, 都有可能有下一层的children ,可以继续查找
      // 这里重点, 如果没有这一句, 就只是单一一层的查找
      // 添加了之后可以不断找到一个部门就往下方children 继续查找找到没有为止
      // 递归
      item.children = listToTree(list, item.id)
    }
  })
  return res
}

console.log(apiData)
console.log(uiData)
console.log(listToTree(apiData, ''))
// 这里的封装递归, 自己想的时候一下子想不到是正常,
// 每当项目做到这些的时候, 真实项目当中, 这种函数写半天, 写一天都是正常
// 没见过写不出, 可以通过百度, 查询类似的逻辑, 另外在学校学这些可以当做之后工作的经验
