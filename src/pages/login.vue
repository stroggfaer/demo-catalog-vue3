<template>
  <div class="login">
    <h1>{{title}}</h1>
    <pre>username: "mor_2314"</pre>
    <pre>password: "83r5^_"</pre>
    <br>
    <br>
    <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        label-width="60px"
    >
      <el-form-item label="Логин" prop="username">
        <el-input v-model="ruleForm.username"
          @focus="handleErrorReset"
          @blur="handleErrorReset"
        />
      </el-form-item>
      <el-form-item label="Пароль" prop="password">
        <el-input v-model="ruleForm.password" type="password" autocomplete="off"
          @focus="handleErrorReset"
          @blur="handleErrorReset"
        />
      </el-form-item>
      <el-form-item>
        <el-button :disabled="disabled" :loading="loadingBtn" type="primary" @click="submitForm(ruleFormRef)">Войти в систему</el-button>
      </el-form-item>
      <div v-if="error" class="error">{{error}}</div>
    </el-form>
  </div>
</template>

<script lang="ts" setup>

import { reactive, ref,computed, onMounted,  } from 'vue'
import type { FormInstance } from 'element-plus'
import {useAuth} from "@/stores/auth";
import {useRouter} from "vue-router";
import {storeToRefs} from "pinia";

const router = useRouter();
const store = useAuth();
const { isToken } = storeToRefs(store)
const title = ref<string>('Вход в личный кабинет');
const error = ref<string>('');
const loadingBtn = ref<boolean>(false);

const ruleFormRef = ref<FormInstance>()

const ruleForm = reactive({
  username:'',
  password: ''
})

const disabled = computed(() => !(ruleForm.username && ruleForm.password && ruleForm.password.length >= 6));

const rules = reactive({
  username: [{ required: true, message: 'Введите логин', trigger: 'blur' }],
  password: [
      { required: true, message: 'Введите пароль', trigger: 'blur' },
      { min: 6, message: 'Пароль должен быть не менее 6 символов', trigger: ['blur', 'change'] }
  ],
})
function handleErrorReset() {
  error.value = '';
}

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async(valid) => {
    error.value = '';
    loadingBtn.value = true
    if (valid) {
      const res = await store.authLogin(ruleForm.username,ruleForm.password);
      if(res) {
        await router.push(`/my`)
      }else{
        error.value = 'Логин или пароль введены некорректно';
      }
      loadingBtn.value = false
      resetForm();
    }
  })
}

const resetForm = () => {
  ruleForm.username = '';
  ruleForm.password = '';
}

onMounted(() => {
  if(isToken.value) {

    router.push('/my');
  }
});



</script>
<style scoped lang="scss">
  .login {
     width: 400px;
     h1 {
       padding-bottom: 20px;
     }
  }
  .error {
    color: $color-red;
  }
</style>
