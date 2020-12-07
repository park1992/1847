<template>
	<div>
		我是一个My组件
		<slot name="two" :data="{a:1,b:2}" userName="xixi" age="12"></slot>
		<!-- <slot></slot> -->
		<!-- <slot name="one"></slot> -->
	</div>
</template>

<script>
export default {

}
</script>
