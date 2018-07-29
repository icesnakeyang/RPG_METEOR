stop={
_id:
jobId:
createdUserId：	创建该stop的用户Id，可能为甲方或者乙方
createdTime：	创建时间，创建时的服务器时间，国际格式
processUserId：	处理用户Id，如果甲方创建，则为乙方，如果乙方创建，则为甲方。
readTime：	处理用户阅读该stop信息的时间。
processResult：处理用户处理结果，true/false，true同意，false为拒绝
processTime：	处理用户处理时间
processRemark：	处理用户处理理由说明
processReadTime：创建用户查看处理结果的时间
}
 1、loadStop
    stops=rpgJobsStop_uia.loadStop(jobId)
    stops为所有stop集合的数组，用于前端显示。

 2、isStop
    读取job任务数据，查看任务状态
    job=rpgJobs_uia.loadById(jobId)
    if job里有stop=true，返回true
    if job里有accept=true 返回true

 3、isEdit
    遍历stop记录，if(processResult 不存在) and createdUserId===当前用户
    return true

 4、isApprove
    遍历stop记录，if(processResult 不存在) and processUserId===当前用户
    return true

 5、isNew
    如果没有stop记录，返回 true
    如果有stop，遍历是否所有记录都有processResult，返回true

 6、用户操作按钮
    if isStop button=Service/客服
    if isEdit button=Edit/编辑
    if isApprove button=Approve/审核
    if isNew button=New/新建

 7、用户点击Edit或New button后，需要填写创建Stop表单,
    表单包括remark（理由说明），refund（退款）
    如果Edit，则读取原来的内容显示，让用户修改。

 8、saveStop，newStopJob里保存stop。
    把jobId，userId（当前登录用户），remark（终止理由），refund（退款）
    打包成一个json参数，发给后台保存。
    refund需要验证必须为Number
    remark不能为空。
    后台方法 rpgJobsStop_uia.saveStop(data)
    data={
        jobId
        userId  当前登录用户 即Meteor.userId()
        remark
        refund
    }
    无论修改，还是新建，都调用saveStop方法，后台会自动区分保存。

 9、用户点击Approve，需要填写Approve Stop表单
    表单包括原申请的remark说明，refund金额，需显示内容。
    表单还有一个空的processRemark框，让处理用户填写处理说明。
    agree按钮，同意stop
    reject按钮，拒绝stop
    后台方法：
    rpgJobsStop_uia.rejectStop(data)
    data={
        jobId
        userId  当前登录用户
        processRemark
    }

    rpgJobsStop_uia.agreeStop(data)
    data={
        jobId
        userId
        processRemark
    }


所有后台方法都不用检测结果，默认成功，不做错误处理。

