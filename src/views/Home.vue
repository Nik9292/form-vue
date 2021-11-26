<template>
  <div class="form">
    <div class="container py-5">
      <h1 class="text-gray-500 font-bold text-xl text-left mb-4">Форма подачи заявки в отдел сервиса и качества</h1>
      <div class="w-full border-2 border-gray-200 p-10">
        <form @submit.prevent="submitForm" class="flex flex-col">
          <fieldset class="w-4/12">
            <div class="flex mb-1">
              <span class="relative pr-2">
              <span class="text-base text-gray-500 w-full text-left">Ваш филиал</span>
              <span class="absolute -top-1 right-0 text-red-600">*</span>
            </span>
            </div>
            <v-select placeholder="Выберите город" :options="cities" label="title" v-model="city" class="mb-4 w-9/12 cursor-pointer" :class="{ 'disabled': online }">
              <template #search="{attributes, events}">
                <input
                    class="vs__search border-none placeholder-gray-400"
                    :required="!online && !city"
                    v-bind="attributes"
                    v-on="events"
                />
              </template>
            </v-select>
            <div class="form-group mb-6 w-max">
              <input type="checkbox" id="online" v-model="online">
              <label for="online" class="relative cursor-pointer">Онлайн</label>
            </div>
          </fieldset>
          <fieldset class="w-4/12 mb-10">
            <div class="flex mb-2">
              <span class="relative pr-2">
                <span class="text-base text-gray-500 w-full text-left">Тема обращения</span>
                <span class="absolute -top-1 right-0 text-red-600">*</span>
              </span>
            </div>
            <div class="cause flex flex-col items-start">
              <div class="mb-2">
                <input type="radio" id="firstReason"
                       value="Недоволен качеством услуг"
                       v-model="reason"
                       class="reason"
                       :checked="true"
                       name="radio-group" :required="!anotherReason">
                <label for="firstReason" class="relative cursor-pointer inline-block text-gray-400">Недоволен качеством услуг</label>
              </div>
              <div class="mb-2">
                <input type="radio" id="secondReason"
                       value="Расторжение договора"
                       v-model="reason"
                       class="reason"
                       name="radio-group">
                <label for="secondReason" class="relative cursor-pointer inline-block text-gray-400">Расторжение договора</label>
              </div>
              <div class="mb-2">
                <input type="radio" id="thirdReason"
                       value="Не приходит письмо активации на почту"
                       v-model="reason"
                       class="reason"
                       name="radio-group">
                <label for="thirdReason" class="relative cursor-pointer inline-block text-gray-400">Не приходит письмо активации на почту</label>
              </div>
              <div class="mb-5">
                <input type="radio" id="fourthReason"
                       value="Не работает личный кабинет"
                       v-model="reason"
                       class="reason"
                       name="radio-group">
                <label for="fourthReason" class="relative cursor-pointer inline-block text-gray-400">Не работает личный кабинет</label>
              </div>
              <input type="text" placeholder="другое"
                     name="radio-group"
                     v-model="anotherReason"
                     @input="reason = null"
                     class="placeholder-gray-200 text-base border-2 border-gray-300 px-2 py-1 w-9/12 rounded outline-none">
            </div>
          </fieldset>
          <fieldset class="mb-10 flex flex-col w-full">
            <div class="flex mb-2">
              <span class="relative pr-2">
                <label for="description" class="text-base text-gray-500 w-full text-left">Описание проблемы</label>
                <span class="absolute -top-1 right-0 text-red-600">*</span>
              </span>
            </div>
            <textarea id="description"
                      placeholder="Введите текст"
                      cols="30" rows="5"
                      class="placeholder-gray-200 text-sm border-2 border-gray-300 px-2 py-1 w-full rounded outline-none"
                      v-model="description" required></textarea>
          </fieldset>
          <div class="flex flex-col items-start mb-10">
            <label for="document" class="text-base text-gray-700 w-full text-left mb-2">Загрузка документов</label>
            <p class="text-sm text-gray-200 w-full text-left leading-none">Приложите, пожалуйста, полноэкранный скриншот.</p>
            <p class="text-sm text-gray-200 w-full text-left mb-2 leading-none">Это поможет нам быстрее решить проблему</p>
            <input type="file" id="document" @input="uploadImg($event)">
          </div>
          <button :disabled="!submitDisabled"
                  :class="{'disabled-button': !submitDisabled}"
                  class="rounded bg-yellow-600 text-white mb-6 w-32 py-2" type="submit">Отправить</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import vSelect from 'vue-select'
import axios from 'axios';

export default {
  name: 'About',
  components: {
    vSelect
  },
  data() {
    return {
      cities: [],
      online: false,
      city: null,
      reason: null,
      anotherReason: '',
      description: '',
      document: '',
      response: '',
      success: false,
      activeClass: false
    }
  },
  mounted() {
    let self = this;
    axios
        .get("https://6196084574c1bd00176c6ff1.mockapi.io/api/v1/cities")
        .then(response => {
          self.cities = response.data;
        })
        .catch(error => {
          console.error(error);
        });
  },
  watch: {
    reason(val) {
      this.reason = val;
      this.anotherReason = '';
    }
  },
  methods: {
    submitForm() {
      axios.post('https://6196084574c1bd00176c6ff1.mockapi.io/api/v1/send-form', {
        city: this.online ? null : this.city,
        online: this.online,
        reason: this.reason,
        anotherReason: this.anotherReason,
        description: this.description,
        document: this.document,
      }).then(response => {
        if(response.data.success) {
          this.$router.push('successful-application')
        } else {
          alert('Ошибка отправки заявки')
        }
      }).catch(error => {
        this.response = 'Error: ' + error.response.status
      })
        this.online = false,
        this.city = null,
        this.reason = null,
        this.anotherReason = '',
        this.document = '',
        this.description = '';
    },
    uploadImg(e) {
      this.document = e.target.files[0];
    },
  },
  computed: {
    submitDisabled() {
      return this.description !== '' && (this.online !== false || this.city !== null) && (this.anotherReason !== '' || this.reason !== null);
    }
  }
}
</script>

<style scoped lang="scss">
.disabled {
  pointer-events:none;
  color: #bfcbd9;
  cursor: not-allowed;
  background-image: none;
  background-color: #eef1f6;
  border-color: #d1dbe5;
}
.disabled-button {
  opacity: 0.6;
  background: gray;
}
.form-group input:checked + label:after {
  content: '';
  @apply block absolute top-0 border-2 border-gray-700 transform rotate-45;
  left: 9px;
  width: 6px;
  height: 14px;
}
.form-group {
  label {
    &:before {
      content:'';
      @apply border-2 border-gray-700 cursor-pointer mr-3 bg-transparent p-4 relative;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05), inset 0px -15px 10px -12px rgba(0, 0, 0, 0.05);
      padding: 10px;
      display: inline-block;
      vertical-align: middle;
    }
  }
  input {
    padding: 0;
    height: initial;
    width: initial;
    margin-bottom: 0;
    display: none;
    cursor: pointer;
    &:checked + label:after{
      content: '';
      @apply absolute block border-t-0 border-r-2 border-b-2 border-l-0 border-gray-700 transform rotate-45;
      top: 2px;
      left: 9px;
      width: 6px;
      height: 14px;
    }
  }
}
.cause {
  [type="radio"]:checked,
  [type="radio"]:not(:checked) {
    position: absolute;
    left: -9999px;
  }
  [type="radio"]:checked + label,
  [type="radio"]:not(:checked) + label
  {
    padding-left: 28px;
    line-height: 20px;
  }
  [type="radio"]:checked + label:before,
  [type="radio"]:not(:checked) + label:before {
    content: '';
    @apply absolute left-0 top-0 border border-gray-700 rounded-full bg-white;
    width: 22px;
    height: 22px;
  }
  [type="radio"]:checked + label:after,
  [type="radio"]:not(:checked) + label:after {
    content: '';
    @apply absolute bg-black rounded-full transition duration-200 ease-in-out;
    width: 14px;
    height: 14px;
    top: 4px;
    left: 4px;
  }
  [type="radio"]:not(:checked) + label:after {
    opacity: 0;
    transform: scale(0);
  }
  [type="radio"]:checked + label:after {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
