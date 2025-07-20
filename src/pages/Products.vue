<template>
  <div class="row">
    <div class="col-12">
      <card>
        <h5 slot="header" class="title">Produtos</h5>
        <form @submit.prevent="addProduct">
          <div class="row">
            <div class="col-md-4">
              <base-input label="Nome" v-model="newProduct.name" placeholder="Produto" />
            </div>
            <div class="col-md-4">
              <select v-model="newProduct.category" class="form-control mt-4">
                <option disabled value="">Categoria</option>
                <option v-for="(cat, idx) in categories" :key="idx" :value="cat.name">
                  {{ cat.name }}
                </option>
              </select>
            </div>
            <div class="col-md-2">
              <base-input label="Preço" v-model.number="newProduct.price" placeholder="0.00" type="number" />
            </div>
            <div class="col-md-2 d-flex align-items-end">
              <base-button type="primary" native-type="submit" fill>Adicionar</base-button>
            </div>
          </div>
        </form>
        <div class="table-responsive">
          <table class="table table-striped">
            <thead class="text-primary">
              <tr>
                <th>Nome</th>
                <th>Categoria</th>
                <th>Preço</th>
                <th class="text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(prod, index) in products" :key="index">
                <td>{{ prod.name }}</td>
                <td>{{ prod.category }}</td>
                <td>{{ prod.price | currency }}</td>
                <td class="text-right">
                  <base-button size="sm" type="danger" @click="removeProduct(index)">Remover</base-button>
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
  name: "Products",
  data() {
    return {
      newProduct: { name: "", category: "", price: 0 },
      products: JSON.parse(localStorage.getItem("products") || "[]"),
      categories: JSON.parse(localStorage.getItem("categories") || "[]"),
    };
  },
  methods: {
    addProduct() {
      if (!this.newProduct.name.trim()) return;
      this.products.push({ ...this.newProduct });
      this.save();
      this.newProduct = { name: "", category: "", price: 0 };
    },
    removeProduct(index) {
      this.products.splice(index, 1);
      this.save();
    },
    save() {
      localStorage.setItem("products", JSON.stringify(this.products));
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

