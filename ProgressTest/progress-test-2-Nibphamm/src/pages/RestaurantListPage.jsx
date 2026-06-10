import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Button, Alert } from 'react-bootstrap'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import RestaurantFilter from '../components/restaurant/RestaurantFilter'
import RestaurantTable from '../components/restaurant/RestaurantTable'
import DeleteModal from '../components/restaurant/DeleteModal'
import Pagination from '../components/restaurant/Pagination'
import { getRestaurants, deleteRestaurant } from '../services/restaurantService'
import { getCategories } from '../services/categoryService'
import { MESSAGES } from '../constants/messages'

const PAGE_SIZE = 5

/**
 * RestaurantListPage — Screen 1: Danh sách restaurant.
 *
 * Chức năng:
 *  1. Tải danh sách restaurants và categories từ API khi mount
 *  2. Lọc theo name (contains, case-insensitive) và category (exact match)
 *  3. Sắp xếp kết quả theo name ascending
 *  4. Phân trang — chỉ hiển thị khi >1 trang
 *  5. Xóa restaurant qua DeleteModal → refresh danh sách
 *  6. Hiển thị MS05 khi API lỗi, MS08 sau khi xóa thành công
 */
function RestaurantListPage() {
  const navigate = useNavigate()

  // --- State ---
  const [restaurants, setRestaurants] = useState([])
  const [categories, setCategories] = useState([])
  const [filtered, setFiltered] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [successMsg, setSuccessMsg] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  // State cho DeleteModal
  const [showModal, setShowModal] = useState(false)
  const [selectedRestaurant, setSelectedRestaurant] = useState(null)

  // --- Load dữ liệu ban đầu ---
  useEffect(() => {
    // TODO: Gọi loadData() khi component mount
    loadData()
  }, [])

  async function loadData() {
    try {
      const [restaurantData, categoryData] = await Promise.all([getRestaurants(), getCategories()])
      const sorted = [...restaurantData].sort((a, b) => a.name.localeCompare(b.name))
      setRestaurants(sorted)
      setFiltered(sorted)
      setCategories(categoryData)
    } catch {
      setErrorMsg(MESSAGES.MS05)
    }
  }

  // --- Xử lý Filter ---
  function handleFilter({ name, category }) {
    const result = restaurants
      .filter((r) => {
        const matchName = name ? r.name.toLowerCase().includes(name.toLowerCase()) : true
        const matchCategory = category ? r.category === category : true
        return matchName && matchCategory
      })
      .sort((a, b) => a.name.localeCompare(b.name))
    setFiltered(result)
    setCurrentPage(1)
  }

  // --- Xử lý Delete ---
  function handleDeleteClick(restaurant) {
    setSelectedRestaurant(restaurant)
    setShowModal(true)
  }

  async function handleDeleteConfirm() {
    setShowModal(false)
    try {
      await deleteRestaurant(selectedRestaurant.id)
      setSuccessMsg(MESSAGES.MS08)
      loadData()
    } catch {
      setErrorMsg(MESSAGES.MS05)
    }
  }

  // --- Phân trang ---
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paginated = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  )

  return (
    <>
      <Header />
      <Container className="my-4">
        <h4>Restaurant List</h4>

        {/* TODO: Hiển thị successMsg (màu success) khi có, tự ẩn sau vài giây hoặc khi user thao tác */}
        {successMsg && <Alert variant="success">{successMsg}</Alert>}

        {/* TODO: Hiển thị errorMsg (màu danger) khi có */}
        {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}

        {/* TODO: Nút Add New → navigate('/restaurants/add') */}
        <div className="d-flex justify-content-end mb-3">
          <Button variant="success" onClick={() => navigate('/restaurants/add')}>
            Add New
          </Button>
        </div>

        {/* TODO: RestaurantFilter — truyền categories và onFilter={handleFilter} */}
        <RestaurantFilter categories={categories} onFilter={handleFilter} />

        {/* TODO: RestaurantTable — truyền danh sách paginated và onDelete={handleDeleteClick} */}
        <RestaurantTable restaurants={paginated} onDelete={handleDeleteClick} />

        {/* TODO: Pagination — truyền currentPage, totalPages, onPageChange, totalRecords, pageSize */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          totalRecords={filtered.length}
          pageSize={PAGE_SIZE}
        />

        {/* TODO: DeleteModal — truyền show, restaurant, onConfirm, onClose */}
        <DeleteModal
          show={showModal}
          restaurant={selectedRestaurant}
          onConfirm={handleDeleteConfirm}
          onClose={() => setShowModal(false)}
        />
      </Container>
      <Footer />
    </>
  )
}

export default RestaurantListPage
