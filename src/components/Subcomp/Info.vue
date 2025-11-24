<template>
  <div style="display: inline">
    <span @click="modal=true" class="info"></span>
    <div >
      <transition name="modal">
        <div v-if="modal" class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-container">
              <button @click="modal=false"  class="modal-default-button has-text-white">
                {{ $t("ok") }}
              </button>
              <div style="font-size: 16px" class="modal-body p-t-30 p-b-30">
                <div class="has-text-centered" v-html="text"></div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Info',
  props: {
    pic: String,
    text: String,
  },
  data(){
    return{
      modal:false
    }
  }
}
</script>


<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);

  display: table;
  transition: opacity 0.8s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}


.modal-container {
  width: 60%;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #352F44;
  border-radius: 2px;
  transition: all 0.3s ease;
  color: #fff;
  border-radius: 2px;
}

.modal-container.thin {
  width: 60%;

}

.modal-header {
  margin-top: 0;
  font-size: 15px;
  font-weight: 500;
  font-weight: 600;
}

.modal-body {
  margin: 50px 0;

}

.modal-container{
  background: #003594;
  color: #fff;
}

.thin .modal-body {
  text-align: center;
}

.modal-default-button {
  float: right;
}

table tr, table tr:last-of-type, .content table thead th {
  border-bottom: 2px solid #777;
}

table tr:last-of-type {
  border-bottom: 2px solid #777;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

button {
  background-color: transparent;
  color: #fff;
  font-weight: bold;
  border: none;
  margin-top: 2px
}


.info {
  height: 20px;
  width: 20px;
  display: inline-block;
  background-image: url("~@/assets/info.svg"); /*url(/img/info.svg);*/
  background-size: 100% 100%;
  margin-left: 4px;
  margin-right: 4px;
  vertical-align: middle;
}
</style>
