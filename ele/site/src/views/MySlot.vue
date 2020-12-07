<template>
	<div>
		<My>
			<template v-slot:one="data">
				{{data.userName}}|{{data.age}}
			</template>
			
			<template v-slot="two">
				v-slot2
			</template>
			<template v-slot:two>
				v-slot2
			</template>
			
			<!-- <template slot="one" slot-scope="data">
				{{data.userName}} | {{data.age}}
			</template>
		
			<template slot="two">具名插槽</template>
			7890 -->
		</My>
	</div>
</template>

<script>
	export default{
		name:"MySlot",
		components:{
			My:()=>import("@/components/My.vue")
		}
	}
	
</script>

<style>
</style>
