<template>
  <div class="row" v-if="list">
    <div class="col-12">
      <card>
        <h5 slot="header" class="title">{{ list.name }} - Compra</h5>
        <div class="table-responsive">
          <table class="table table-striped">
            <thead class="text-primary">
              <tr>
                <th>Produto</th>
                <th>Qtd</th>
                <th>Peso</th>
                <th>No Carrinho</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, idx) in list.items" :key="idx">
                <td>{{ item.product }}</td>
                <td>{{ item.quantity }}</td>
                <td>{{ item.weight }}</td>
                <td>
                  <input type="checkbox" v-model="item.inCart" @change="save" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </card>
    </div>
  </div>
  <div v-else>
    Lista não encontrada
  </div>
</template>

<script>
export default {
  name: "Purchase",
  data() {
    return {
      index: parseInt(this.$route.params.id, 10),
      lists: JSON.parse(localStorage.getItem("lists") || "[]"),
    };
  },
  computed: {
    list() {
      return this.lists[this.index];
    },
  },
  methods: {
    save() {
      this.lists.splice(this.index, 1, this.list);
      localStorage.setItem("lists", JSON.stringify(this.lists));
      const history = JSON.parse(localStorage.getItem("history") || "[]");
      history.push({
        date: new Date().toISOString(),
        items: this.list.items.map((i) => ({
          product: i.product,
          quantity: i.quantity,
          weight: i.weight,
          price: this.findPrice(i.product),
        })),
      });
      localStorage.setItem("history", JSON.stringify(history));
    },
    findPrice(name) {
      const prods = JSON.parse(localStorage.getItem("products") || "[]");
      const p = prods.find((x) => x.name === name);
      return p ? p.price : 0;
    },
  },
};
</script>

<style scoped>
.table {
  margin-top: 1rem;
}
</style>

