/**
 * 所有数据集都定义在这里
 * Tasks：私有任务
 * TasksLog：私有任务日志
 *
 * Jobs：公共任务
 * JobsMatch：公共任务匹配日志
 * JobsLog：公共任务沟通日志
 * JobsComplete：公共任务完成验收日志
 * JobsStop：公共任务终止日志
 * JobsAppeal：公共任务申诉日志
 * JobsAppealPost：申诉日志的跟帖记录
 * JobsRepeal：公共任务申诉事件撤诉日志
 *
 * UserInfo：用户的所有当前信息数据
 * UserRole：用户的角色权限信息
 * UserCash：用户的资金账户的流水账
 * UserHonor：用户荣誉值流水账
 *
 * LoginLogs：用户登录日志
 * Settings：系统设置数据
 */

/**
 * 任务 Tasks & Jobs//////////////////////////////////////////////////////////
 */
/**
 * 私有任务
 * Tasks
 */
export const Tasks=new Mongo.Collection('tasks');

/**
 * 私有任务日志
 *
 */
export const TasksLog=new Mongo.Collection('tasksLog');

/**
 * 公共任务
 * Jobs
 *
 */
export const Jobs=new Mongo.Collection('jobs');

/**
 * 公共任务分配日志
 *
 */
export const JobsMatch=new Mongo.Collection('jobsMatch');

/**
 *公共任务沟通日志
 * JobsLog
 *
 */
export const JobsLog=new Mongo.Collection('jobsLog');

/**
 * 公共任务完成验收日志
 *
 */
export const JobsComplete=new Mongo.Collection('jobsComplete');

/**
 * 公共任务终止任务日志
 *
 */
export const JobsStop=new Mongo.Collection('jobsStop');

/**
 * appeals为用户创建的申诉事件主题内容
 *
 */
export const JobsAppeal=new Mongo.Collection('jobsAppeal');

export const JobsAppealPost=new Mongo.Collection('jobsAppealPost');

/**
 * repeal为用户创建的撤销申诉事件申请
 *
 */
export const JobsRepeal=new Mongo.Collection('jobsRepeal');

/**
 * 用户信息 角色 账户//////////////////////////////////////////////////////////
 */
/**
 * 用户信息
 * UserInfo
 * 用户的唯一信息，所有状态，当前值等，只要不是需要从日志记录里分析计算的都记录在这里，日志更新时同时刷新这个数据集。
 *
 */
export const UserData=new Mongo.Collection('userData');

//注意：所有权限、账户、荣誉值集合都是流水记录，而统计数据，都保存在UserData里。

/**
 * 用户个人信息
 * UserInfo
 *
 */
export const UserInfo=new Mongo.Collection('userInfo');

/**
 * 用户权限在这个集合里
 *
 */
export const UserRole=new Mongo.Collection('userRole');

/**
 * 用户的现金账户
 *
 */
export const UserCash=new Mongo.Collection('userCash');

/**
 * 用户的荣誉值
 *
 */
export const UserHonor=new Mongo.Collection('userHonor');

/**
 * Administrator//////////////////////////////////////////////////////////
 */

/**
 * 用户行为日志
 * 记录用户访问的页面，或者执行的操作等
 */
export const ActLog=new Mongo.Collection('actLog');

/**
 * 系统设置
 */
export const Settings=new Mongo.Collection('settings');

export const GPS=new Mongo.Collection('gps');