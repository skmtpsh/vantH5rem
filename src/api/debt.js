import request from '@/plugin/axios'
import util from '@/utils/index'
import store from '@/store'

const pageQuery = () => {
  return Object.assign({}, util.query(), { tokenKey: util.cookies.get('token'), appId: store.state.user.info.appId })
}

/**
 * @class 信息审核接口
*/
export const checkList = ({
  appId = '',
  fileWay = '',
  approvalStatus = '',
  startDate = '',
  endDate = '',
  pageSize = '',
  pageNum = ''
}) => {
  return request({
    url: 'approval/getlist',
    method: 'post',
    data: Object.assign({
      fileWay,
      approvalStatus,
      startDate,
      endDate,
      pageSize,
      pageNum
    }, pageQuery(), { appId })
  })
}
/**
 *  @class 合作商户
 */
export const merchantList = () => {
  return request({
    url: 'approval/merchantlist',
    method: 'post',
    data: Object.assign({
    }, pageQuery())
  })
}

/**
 *  @class 清单列表
 */
export const debtList = ({
  debtListCversion = '',
  fileWay = '',
  id = '',
  pageSize = '',
  pageNum = ''
}) => {
  return request({
    url: 'approval/debtlist',
    method: 'post',
    data: Object.assign({
      debtListCversion,
      fileWay,
      id,
      pageSize,
      pageNum
    }, pageQuery())
  })
}

/**
 *  @class 处理审核
 */
export const debtDeal = ({
  id = '',
  approvalStatus = '',
  remark = ''
}) => {
  return request({
    url: 'approval/deal',
    method: 'post',
    data: Object.assign({
      id,
      approvalStatus,
      remark
    }, pageQuery())
  })
}

/**
 *  @class 批量处理审核
 */
export const debtBatchDeal = ({
  ids = '',
  approvalStatus = '',
  remark = ''
}) => {
  return request({
    url: 'approval/batchdeal',
    method: 'post',
    data: Object.assign({
      ids,
      approvalStatus,
      remark
    }, pageQuery())
  })
}

/**
 *  @class 债转文件删除
 */
export const debtListDel = ({
  id = ''
}) => {
  return request({
    url: 'approval/delete',
    method: 'post',
    data: Object.assign({
      id
    }, pageQuery())
  })
}

/**
 *  @class 合同查询
 */
export const debtListContract = ({
  appId = '',
  contractNo = '',
  startDate = '',
  endDate = ''
}) => {
  return request({
    url: 'contract/getlist',
    method: 'post',
    data: Object.assign({
      contractNo,
      startDate,
      endDate
    }, pageQuery(), { appId })
  })
}

/**
 *  @class 合同预览
 */
export const debtPreviewContract = ({
  pdfContractNo = ''
}) => {
  return request({
    url: 'contract/preview/contract',
    method: 'post',
    data: Object.assign({
      pdfContractNo
    }, pageQuery())
  })
}

/**
 *  @class 债转清单预览
 */
export const debtPreviewDebt = ({
  excelContractNo = ''
}) => {
  return request({
    url: 'contract/preview/debt',
    method: 'post',
    data: Object.assign({
      excelContractNo
    }, pageQuery())
  })
}

/**
 *  @class 影像资料预览
 */
export const debtPreviewPicture = ({
  debtApprovalId = ''
}) => {
  return request({
    url: 'contract/preview/picture',
    method: 'post',
    data: Object.assign({
      debtApprovalId
    }, pageQuery())
  })
}

/**
 *  @class 合同预览
 */
export const debtDownContract = ({
  pdfContractNo = ''
}) => {
  return request({
    url: 'contract/download/contract',
    method: 'post',
    data: Object.assign({
      pdfContractNo
    }, pageQuery())
  })
}

/**
 *  @class 债转清单预览
 */
export const debtDownDebt = ({
  excelContractNo = ''
}) => {
  return request({
    url: 'contract/download/debt',
    method: 'post',
    data: Object.assign({
      excelContractNo
    }, pageQuery())
  })
}

/**
 *  @class 影像资料预览
 */
export const debtDownPicture = ({
  debtApprovalId = ''
}) => {
  return request({
    url: 'contract/download/picture',
    method: 'post',
    data: Object.assign({
      debtApprovalId
    }, pageQuery())
  })
}

/**
 *  @class 影像资料预览
 */
export const debtContractAdd = ({
  debtApprovalId = '',
  companyName = '',
  debtNo = '',
  debtAmtCapital = '',
  debtAmt = '',
  loanAmtCapital = '',
  loanAmt = '',
  contractYear = '',
  contractMonth = '',
  contractDay = ''
}) => {
  return request({
    url: 'contract/add',
    method: 'post',
    data: Object.assign({
      debtApprovalId,
      companyName,
      debtNo,
      debtAmtCapital,
      debtAmt,
      loanAmtCapital,
      loanAmt,
      contractYear,
      contractMonth,
      contractDay
    }, pageQuery())
  })
}

/**
 *  @class 借款合同
 */

export const debtContractList = ({
  appId = '',
  partyName = '',
  partyIdcard = '',
  startDate = '',
  endDate = '',
  pageSize = '',
  pageNum = ''
}) => {
  return request({
    url: 'loan/getlist',
    method: 'post',
    data: Object.assign({
      partyName,
      partyIdcard,
      startDate,
      endDate,
      pageSize,
      pageNum
    }, pageQuery(), { appId })
  })
}

/**
 *  @class 借款合同下载
 */
export const debtContractDown = ({
  pdfContractNo = ''
}) => {
  return request({
    url: 'loan/download',
    method: 'post',
    data: Object.assign({
      pdfContractNo
    }, pageQuery())
  })
}

/**
 *  @class 借款合同预览
 */
export const debtContractPreview = ({
  pdfContractNo = ''
}) => {
  return request({
    url: 'loan/preview',
    method: 'post',
    data: Object.assign({
      pdfContractNo
    }, pageQuery())
  })
}

/**
 *  @class 借款合同预览
 */
export const debtContractBatchDown = ({
  pdfContractNos = ''
}) => {
  return request({
    url: 'loan/batchdownload',
    method: 'post',
    data: Object.assign({
      pdfContractNos
    }, pageQuery())
  })
}

const debtApi = {
  checkList,
  merchantList,
  debtList,
  debtDeal,
  debtBatchDeal,
  debtListDel,
  debtListContract,
  debtPreviewContract,
  debtPreviewDebt,
  debtPreviewPicture,
  debtDownContract,
  debtDownDebt,
  debtDownPicture,
  debtContractAdd,
  debtContractList,
  debtContractDown,
  debtContractPreview,
  debtContractBatchDown
}
export default debtApi
