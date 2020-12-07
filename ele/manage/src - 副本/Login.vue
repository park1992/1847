<template>
	<!-- 从elementUI引入组件 看说明 必须写这个:model="adminForm"-->
	<el-form ref="adminForm" :model="adminForm" class="container" :rules="rules">
		<h3>饿了么后台管理系统</h3>
		<el-form-item prop="adminName">
			<!-- input限制，必须配合v-model才能输入内容，出效果 -->
			<el-input v-model="adminForm.adminName" placeholder="请输入管理员账号"></el-input>
		</el-form-item>

		<el-form-item prop="passWord">
			<el-input v-model="adminForm.passWord" type="password" placeholder="请输入管理员密码"></el-input>
		</el-form-item>

		<el-form-item>
			<el-button :loading="$store.state.isLoading" style="width:100%" @click="submitForm" type="primary">登录</el-button>
		</el-form-item>
	</el-form>
</template>

<script>
	export default {
		name: "Login",
		data() {
			return {
				adminForm: {					
					adminName: "",
					passWord: ""
				},
				// 限制字段的，规则、条件
				rules: {
					adminName: [{
							required: true,
							message: '请输入管理员账号',
							trigger: 'blur'
						},
						{
							min: 5,
							max: 8,
							message: '长度在 5 到 8 个字符',
							trigger: 'blur'
						}
					],
					passWord: [{
							required: true,
							message: '请输入管理员密码',
							trigger: 'blur'
						},
						{
							min: 5,
							max: 8,
							message: '长度在 5 到 8 个字符',
							trigger: 'blur'
						}
					],
				}
			}
		},
		methods: {
			submitForm() {
				this.$refs.adminForm.validate((valid) => {
					if (valid) {
						// 规则验证成功
						this.isLoading = true;
						// 调用store中的admin中的action里的方法login，传值实例this
						this.$store.dispatch('login',this);
					} else {
						// 验证失败
						// message消息提示组件
						this.$message.error('请输入完整的信息');
					}
				})
			}
		}
	}
</script>

<style scoped lang="less">
	.container {
		border: 1px solid #eaeaea;
		margin: 150px auto;
		width: 350px;
		padding: 10px 20px;

		h3 {
			text-align: center;
		}
	}
</style>
