import db from '../BancoDeDados/db.js';

export const getPedidoController = (req, res) => {
  try { 
    const { id } = req.query
    let comandosql = 'SELECT * FROM pedidos'
    let paramssql = []
    if(id){
      comandosql += ' WHERE id = ?'
      paramssql.push(id)
  }
  console.log('ID recebido:', id)
    db.get( comandosql, paramssql, (err, row)=>{
      if (err) {
        console.log('Erro ao encontrar Pedido', err)
        return res.status(500).json({ mensagem: 'Erro ao buscar pedido' })
      }
      if (!row) {
        return res.status(404).json({ mensagem: 'Pedido não encontrado' })
      }
      res.status(200).json(row);
    })
  } catch (error) {
    res.status(500).json({ mensagem: 'Pedido não encontrado' })
  }
}
/////////////////////////////////////////////////////////////////////
export const postPedidoController = (req, res) => {
  try {
    const { idCliente, idProduto, data } = req.body;

    db.run(
      'INSERT INTO pedidos (cliente_id, produto_id, data) VALUES (?, ?, ?)',
      [idCliente, idProduto, data],
      function (err) {
        if (err) {
          console.log('Erro ao adicionar pedido:', err);
          return res.status(500).json({ mensagem: 'Erro ao adicionar pedido' })
        }
        res.status(201).json({ mensagem: `Pedido ${this.lastID} adicionado com sucesso!` })
      }
    )
  } catch (error) {
    res.status(500).json({ mensagem: 'Pedido não pode ser adicionado' })
  }
}
/////////////////////////////////////////////////////////////////////  
export const putPedidoController = (req, res) => {
  try {
    const { id, idCliente, idProduto, data } = req.body;

    db.run(
      'UPDATE pedidos SET cliente_id = ?, produto_id = ?, data = ? WHERE id = ?',
      [idCliente, idProduto, data, id],
      function (err) {
        if (err) {
          console.log('Erro ao atualizar pedido:', err)
          return res.status(500).json({ mensagem: 'Erro ao atualizar pedido' })
        }
        if (this.changes === 0) {
          return res.status(404).json({ mensagem: 'Pedido não encontrado' })
        }
        res.status(200).json({ mensagem: `Pedido ${id} atualizado com sucesso!` })
      }
    )
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro na atualização do pedido' });
  }
}
/////////////////////////////////////////////////////////////////////  
export const deletePedidoController = (req, res) => {
  try {
    const { id } = req.body;

    db.run('DELETE FROM pedidos WHERE id = ?', [id], function (err) {
      if (err) {
        console.log('Erro ao deletar pedido:', err)
        return res.status(500).json({ mensagem: 'Erro ao deletar pedido' })
      }
      if (this.changes === 0) {
        return res.status(404).json({ mensagem: 'Pedido não encontrado' })
      }
      res.status(200).json({ mensagem: `Pedido ${id} deletado com sucesso!` })
    })
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro na exclusão do pedido' })
  }
}
