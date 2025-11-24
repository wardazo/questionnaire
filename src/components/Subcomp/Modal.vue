<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
<!--        <button @click="$emit('close')" class="close-modal">-->
<!--          <svg xmlns="http://www.w3.org/2000/svg" width="43.275" height="43.274" viewBox="0 0 43.275 43.274">-->
<!--            <path id="close" d="M25.6,21.773,42.452,4.922A2.8,2.8,0,0,0,38.488.958L21.637,17.809,4.787.958A2.8,2.8,0,0,0,.822,4.922l16.85,16.851L.822,38.624a2.8,2.8,0,1,0,3.964,3.964l16.85-16.851L38.488,42.588a2.8,2.8,0,0,0,3.964-3.964Zm0,0" transform="translate(0 -0.136)" fill="#fff"/>-->
<!--          </svg>-->
<!--        </button>   -->
        <slot name="body"></slot>
        <div class="">
          <slot name="base">

          </slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    thin: Boolean
  },
}
</script>


<style lang="scss" scoped>

.wide {
  width: 95vw;
  height: 80vh;
}

.modal-mask {
  position: fixed;
  z-index: 100000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #003594;
  text-align: center;
  transition: opacity 0.8s ease;
  overflow: hidden auto;
  display: block;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &:before {
    content: '';
    display: inline-block;
    vertical-align: middle;
    height: 100%;
  }

  &::-webkit-scrollbar {
    display: none;
  }
}

.modal-wrapper {
  display: inline-block;
  vertical-align: middle;
  position: relative;
  z-index: 32;
  max-width: 990px;
  width: 100%;
  margin: 46px auto;
  padding: 0 40px;

  .close-modal {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 32;
    width: 43px;
    height: 43px;
    display: block;
    padding: 0;
    border: 0 none;
    background: none;
    cursor: pointer;
    transition: all 0.2s linear;

    svg {
      display: block;
      width: 43px;
      height: 43px;
    }

    &:hover {
      color: #173594;
      opacity: .8;
    }

    &:focus {
      outline: 0;
    }
  }
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

.thin .modal-body {
  text-align: center;
}

.modal-default-button {
  float: right;
}

.modal-mask table tr, .modal-mask .content table thead th {
  border-bottom: 1px solid #fff !important;
}

.modal-mask table tbody tr:last-of-type {
  border-bottom: 1px solid #fff;
}


.modal-mask table tbody tr {
  border-bottom: 1px solid #fff !important;
}

.modal-mask table tr:first-of-type {
  border-bottom: 1px solid #fff !important;
}

.modal-mask table tr:last-of-type {
  border-bottom: 1px solid #fff !important;
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
  background-color: #3F6442;
  color: #fff;
  font-weight: bold;
  border: none;
  margin-top: 2px
}


.reference-screen-wrap {
  width: 100%;
  background-color: #2c4386;
}

.reference-screen {
  max-width: 858px;
  width: 100%;
  margin: 0 auto;
  padding: 0 50px;

  h2 {
    font-size: 35px;
    line-height: 1.2em;
    font-weight: 800;
    color: #fff;
    margin: 0 0 50px;
  }

  ul {
    counter-reset: item;
    padding: 0 0 20px;
    margin: 0;
    list-style: none;

    li {
      display: block;
      margin: 0 0 25px 55px;
      font-size: 16px;
      line-height: 1.3em;
      color: #fff;

      &:before {
        content: counter(item);
        counter-increment: item;
        display: inline-block;
        width: 55px;
        margin-left: -55px;
        font-weight: 700;
      }

      a {
        color: #fff;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }

  .box-button {
    max-width: 484px;
    width: 100%;
    margin: 0 auto;

    button {
      display: block;
      width: 100%;
      font-size: 20px;
      line-height: 1em;
      font-weight: 700;
      color: #fff;
      background: #2c4386;
      border: 2px solid #fff;
      border-radius: 5px;
      padding: 18px 20px;
      height: initial;
      transition: all 0.2s linear;
      text-transform: uppercase;

      &:hover {
        background: #fff;
        color: #2c4386;
      }
    }
  }
}
</style>
