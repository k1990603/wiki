
import React from 'react'
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native'

function OrderCell({ item, navigate }) {

  return (
    <TouchableOpacity>
      <View style={styles.list}>
        <View style={[styles.boxconmon, styles.header]}>
          <View style={styles.hleft}>
            <Text style={styles.name}>
              {item.title ? (item.title.length > 20 ? item.title.substr(0, 20) + "..." : item.title) : ""}
            </Text>
            <Text style={styles.point}>></Text>
          </View>
          <View style={styles.hright}>
            <Text style={styles.done}>已完成</Text>
          </View>
        </View>
        <View style={[styles.boxconmon, styles.content]}>
          <View style={styles.contInner}>
            <View numberOfLines={1} style={styles.row}>
              <Text style={[styles.txt, styles.txtone]}>智互联超级无敌无计算机运算系统8888*666</Text>
            </View>
            <View numberOfLines={1} style={styles.row}>
              <Text style={styles.txt}>销售订单号 : </Text>
              <Text style={styles.txt}>47575758723548372758967</Text>
            </View>
            <View numberOfLines={1} style={styles.row}>
              <Text style={styles.txt}>时间 : </Text>
              <Text style={styles.txt}>2018/08/06 12:15</Text>
            </View>
            <View numberOfLines={1} style={styles.row}>
              <Text style={styles.txt}>价格 : </Text>
              <Text style={styles.txt}>￥1215.0000</Text>
            </View>
            <View numberOfLines={1} style={styles.row}>
              <Text style={styles.txt}>数量 : </Text>
              <Text style={styles.txt}>2018/08/06 12:15</Text>
            </View>
            <View numberOfLines={1} style={styles.row}>
              <Text style={styles.txt}>交期 : </Text>
              <Text style={styles.txt}>2018/08/06 12:15</Text>
            </View>
          </View>
        </View>

      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  list: {
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
    flexDirection: 'column'
  },
  boxconmon: {
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    backgroundColor: '#FFFFFF',

  },
  header: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    height: 38,
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#eaeaea'
  },
  hleft: {
    alignItems: 'center',
    flexDirection: 'row',
    overflow: 'hidden'
  },
  point: {
    marginLeft: 5
  },
  name: {
    color: '#323232'
  },
  done: {
    color: '#008ee3'
  },
  content: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    paddingBottom: 6,
    paddingTop: 6
  },
  contInner: {
    borderBottomWidth: 1,
    borderColor: '#eaeaea'
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    overflow: 'hidden',
    marginBottom: 4
  },
  txtone: {
    color: '#323232',
    fontSize: 14,
    fontWeight: 'bold'
  },
  txt: {
    color: '#646464',
    fontSize: 12
  }
});

export default OrderCell
