<script setup>
import { computed, ref } from "vue";
import { analyzeImageML } from "../AmazonML.js";
import { shareImageList, shareSelectedImageIndex, } from "../ImageState";
let { images } = shareImageList();
let { selectedImageIndex } = shareSelectedImageIndex();

let apiMessage = ref({
  show: false,
  type: "info",
  text: "",
});


let apiDetectLabelsRequestInProgress = ref(false);
const analyzeImage = async () => {
  let imageSrc = images.value[selectedImageIndex.value].src;
  let requestInProgress;
  let resultField;
  requestInProgress = apiDetectLabelsRequestInProgress;
  resultField = "rekResult";
  requestInProgress.value = true;

  try {
    const returnData = await analyzeImageML(imageSrc);
    const results = JSON.parse(returnData);
    if (results.type === "success") {
      images.value[selectedImageIndex.value][resultField] = results.text;
    } else {
      apiMessage.value.type = results.type;
      apiMessage.value.text = results.text;
      apiMessage.value.show = true;
    }
  } catch (error) {
    apiMessage.value.type = "error";
    apiMessage.value.text = error;
    apiMessage.value.show = true;
  } finally {
    requestInProgress.value = false;
  }
};

const onDetectLabelsClick = async () => {
  await analyzeImage();
};

</script>

<template>
  <v-col cols="12">
    <v-card class="d-flex" variant="tonal" color="primary" width="auto">
      <v-img
        :src="images[selectedImageIndex]"
        class="shrink ma-2"
        min-height="400px"
        max-height="500px"
      />
      <v-col
        cols="2"
        class="d-flex flex-column justify-center"
        align-self="center"
      >
        <v-btn
          raised
          x-large
          variant="tonal"
          @click="onDetectLabelsClick"
          class="mb-2"
          style="font-size: 18px; text-transform: none"
          height="100px"
          :loading="apiDetectLabelsRequestInProgress"
          ><span>Detect<br />Labels<br /></span
        ></v-btn>
        <v-dialog v-model="apiMessage.show">
          <v-alert dismissible :type="apiMessage.type" :text="apiMessage.text">
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-btn
              style="text-transform: none"
              variant="tonal"
              color="white"
              text="Close"
              @click="apiMessage.show = false"
            ></v-btn>
          </v-alert>
        </v-dialog>
      </v-col>
      <v-col>
        <v-card variant="tonal" color="primary" max-height="600px">
          <v-window>
            <v-window-item value="labels">
              <v-table
                style="width: 100%; height: 400px; text-align: center"
                
              >
                <thead>
                  <tr>
                    <th style="text-align: center; font-size: 18px">
                      <strong>Saree Style and Origin</strong>
                    </th>
                    <th style="text-align: center; font-size: 18px">
                      <strong>Confidence</strong>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="objectDetected in images[selectedImageIndex]
                      ?.rekResult?.CustomLabels"
                    :key="objectDetected.Name"
                  >
                    <td>
                      <span> {{ objectDetected.Name }} </span>
                    </td>
                    <td>
                      {{ parseFloat(objectDetected.Confidence).toFixed(1) }}%
                    </td>
                  </tr>
                </tbody>
              </v-table>
            </v-window-item>
          </v-window>
        </v-card>
      </v-col>
    </v-card>
  </v-col>
</template>