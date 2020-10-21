import Api from '@/services/Api'
export default {
    index(search) {
        return Api().get('writes', {
            params: {
                search: search
            }
        })
    },
    show(writeId) {
        return Api().get('write/' + writeId)
    },
    post(write) {
        return Api().post('write', write)
    },
    put(write) {
        return Api().put('write/' + write.id, write)
    },
    delete(write) {
        return Api().delete('write/' + write.id, write)
    },
}