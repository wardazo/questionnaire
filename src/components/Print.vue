<template>
  <div class="container printer vvvj">
    <div class="container">
      <div class="columns mailform">
        <div
            style="border-radius: 5px"
            class="column is-4 is-offset-4 has-background-primary m-t-90 m-b-20"
        >
          <div class="is-size-5 has-text-centered has has-text-white m-b-15">
            {{ $t("Send by email") }}
          </div>

          <div>
            <input
                type="email"
                class="input"
                v-model.trim="mail"
                :placeholder="$t('email')"
                required
            />
            <!--            <div class="has-text-red has-text-centered" v-if="mail.required">{{ $t("Field is required") }}</div>-->
            <!--            <div class="has-text-red has-text-centered" v-if="!$v.mail.email">{{ $t("This must be a valid email") }}-->
            <!--            </div>-->
            <!--            <div class="has-text-red has-text-centered" v-if="!$v.mail.incAlcon">-->
            <!--              {{ $t("The email must contain @alcon.com") }}-->
            <!--            </div>-->





            <div style="background: darkred; padding:5px;color:white;margin: 2px 0" v-if="v$.mail.$errors.length">
              {{ v$.mail.$errors[0].$message }}
            </div>



          </div>

          <button
              @click="validateAndSend()"
              class="m-t-10 button is-block is-fullwidth is-outlined is-white"
          >
            {{ $t("Send") }}
          </button>

          <div class="has-text-centered p-t-30">
            <span
                class="has-text-white"
                @click="$emit('page-change', { pg: 1, tab: 0 })"
            >
              &lt; {{ $t("Back") }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <div ref="texty">
      <div class="print-page">
        <div class="print-page-header">
          <h1 >Title</h1>
        </div>

        <div class="print-page-canvas">
          <div ref="canvas" >
            <div style="position:relative" class="print-page-canvas-top">
              <div>
                <page1 v-if="!canvas" :page="page" :initialdata="initialdata" :printer="true"/>
                <div v-else class="print-canvas-img">
                  <img :src="canvas"/>
                </div>
              </div>
              <div style="position: absolute;top:0;bottom:0;left:0;right:0"></div>

            </div>
          </div>

        </div>
      </div><!-- end /.print-page -->
    </div>

  </div>
</template>

<script>
import Page1 from "@/components/page1";
import Page6 from "@/components/page6";

//import {fireEvent} from '@pitcher/vue-sdk'
import { pdf } from "@/modules/pdf";
import html2canvas from "html2canvas";
import generatePDF from "@/models/docraptor";
import { useVuelidate } from '@vuelidate/core'
import { required, email, helpers } from '@vuelidate/validators'
import {useScenarioStore} from "@/stores/scenarioStore";





export default {
  name: "Print",
  components: {
    Page1,
  },
  setup() {

  },
  props: {

  },
  data() {
    return {
      base64: null,
      innerHtml: "",
      paper: "",
      html: "",
      required: "",
      mail: "",
      incAlcon: "",
      canvas: "",
      canvas2: "",
    };
  },
  validations() {
    return {
      mail: {
        required,
        email,
        // endsWithAlcon: {
        //   $validator: (value) => {
        //     if (!value) return true // Skip if empty (let required handle it)
        //     return value.toLowerCase().endsWith('@alcon.com') || value.toLowerCase().endsWith('@dsicom.es ') || value.toLowerCase() === 'wardazo@gmail.com'
        //   },
        //   $message: this.$t("The email must contain @alcon.com")
        // }
      }
    }
  },
  methods: {
    async validateAndSend() {
      this.v$.$touch()
      if (this.v$.$invalid) {
        return
      }
      await this.send()
    },
    async send() {
      const canvas = await html2canvas(this.$refs.canvas);
      this.canvas = canvas.toDataURL();

      const canvas2 = await html2canvas(this.$refs.canvas2);
      this.canvas2 = canvas2.toDataURL();


      this.$nextTick(() => {
        this.innerHtml = this.$refs.texty.innerHTML;
        this.paper = this.html.replace("C_O_N_T_E_N_T", this.innerHtml);
        const evPar = {
          html: this.paper,
          filename: "Patient_Journey_Optimisation_Assessment_tool.pdf",
          sendEmail: true,
          body: this.scenarioStore.currentScenario.title + " " + this.scenarioStore.currentScenario.title2 + ": pdf is ready.",
          fromName: "Alcon",
          emailSubject: "Patient Journey Optimisation Assessment Tool PDF",
          toAddresses: [this.mail],
          addAtachment: true,
          sfdcID: this.appId,
          //'javascript':true
        };


        //fireEvent('sendStatsFromHTML', {'event_name': 'event_redirect_sendAttachPDF', 'event_params': evPar});
        //generatePDF(this.paper)


        // eslint-disable-next-line
        Ti.App.fireEvent('sendStatsFromHTML', { 'event_name': 'event_redirect_sendAttachPDF',
          'event_params': evPar });

        alert("Email sent to to: " + this.mail);
        this.base64 = null;
      });

    },
  },

  mounted() {
    this.base64 = null;
    this.html = pdf;
  },
  activated() {
    this.base64 = null;
    this.html = pdf;
  },
};
</script>

<style scoped>
.only-paper {
  display: none;
}

.no-paper {
  display: block;
}
</style>

<style>

.print-page .print-page-footer .print-page-footer-content p:last-child {
  margin: 0;
}

.print-page .print-page-footer .print-page-footer-logo svg {
  display: block;
  width: 218px;
  height: 63px;
}

</style>
