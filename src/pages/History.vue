<template>
  <div class="row">
    <div class="col-12">
      <card>
        <h5 slot="header" class="title">Histórico de Compras</h5>
        <div class="table-responsive">
          <table class="table table-striped">
            <thead class="text-primary">
              <tr>
                <th>Data</th>
                <th>Itens</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(h, idx) in history" :key="idx">
                <td>{{ formatDate(h.date) }}</td>
                <td>
                  <ul class="mb-0">
                    <li v-for="(item, i) in h.items" :key="i">
                      {{ item.product }} - {{ item.quantity }} - R$ {{ item.price | currency }}
                    </li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </card>
    </div>
  </div>
</template>

<script>
export default {
  name: "History",
  data() {
    return {
      history: JSON.parse(localStorage.getItem("history") || "[]"),
    };
  },
  methods: {
    formatDate(d) {
      return new Date(d).toLocaleString();
    },
  },
  filters: {
    currency(val) {
      return parseFloat(val).toFixed(2);
    },
  },
};
</script>

<style scoped>
.table {
  margin-top: 1rem;
}
</style>

