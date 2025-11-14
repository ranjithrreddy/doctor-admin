import React, { useState, useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

export const DoctorProfile = () => {
  const { backendUrl, dToken, profileData, setProfileData, getProfileData } =
    useContext(DoctorContext)
  const { currency } = useContext(AppContext)
  const [isEdit, setIsEdit] = useState(false)

  const updateProfile = async () => {
    try {
      const updateData = {
        docId: profileData._id, // important
        address: profileData.address,
        fees: profileData.fees,
        available: profileData.available,
      }

      const { data } = await axios.post(
        backendUrl + '/api/doctor/update-profile',
        updateData,
        { headers: { dToken } }
      )

      if (data.success) {
        toast.success(data.message)
        setIsEdit(false)
        getProfileData()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.error(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (dToken) {
      getProfileData()
    }
  }, [dToken])

  if (!profileData) return null

  return (
    <div>
      <div className='flex flex-col gap-4 m-5'>
        <div>
          <img
            className='bg-primary/80 w-full sm:max-w-64 rounded-lg'
            src={profileData.image}
            alt='doctor'
          />
        </div>

        <div className='flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white'>
          {/* doctor information */}
          <p className='flex items-center gap-2 text-3xl font-medium text-gray-700'>
            {profileData.name}
          </p>

          <div className='flex items-center gap-2 mt-1 text-gray-600'>
            <p>
              {profileData.degree} - {profileData.speciality}
            </p>
            <button className='py-0.5 px-2 border text-xs rounded-full'>
              {profileData.experience}
            </button>
          </div>

          {/* about */}
          <div>
            <p className='flex items-center gap-1 text-sm font-medium text-neutral-800 mt-3'>
              About:
            </p>
            <p className='text-sm text-gray-600 max-w-[700px] mt-1'>
              {profileData.about}
            </p>
          </div>

          {/* fees */}
          <p className='text-gray-600 font-medium mt-4'>
            Appointment Fee:
            <span className='text-gray-800 ml-1'>
              {currency}
              {isEdit ? (
                <input
                  type='number'
                  className='border rounded px-2 py-1 ml-2 w-24'
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      fees: e.target.value,
                    }))
                  }
                  value={profileData.fees}
                />
              ) : (
                profileData.fees
              )}
            </span>
          </p>

          {/* address */}
          <div className='flex gap-2 py-2'>
            <p>Address:</p>
            <p className='text-sm'>
              {isEdit ? (
                <>
                  <input
                    type='text'
                    className='border rounded px-2 py-1 mb-1 w-full'
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line1: e.target.value },
                      }))
                    }
                    value={profileData.address?.line1 || ''}
                  />
                  <input
                    type='text'
                    className='border rounded px-2 py-1 w-full'
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line2: e.target.value },
                      }))
                    }
                    value={profileData.address?.line2 || ''}
                  />
                </>
              ) : (
                <>
                  {profileData.address?.line1}
                  <br />
                  {profileData.address?.line2}
                </>
              )}
            </p>
          </div>

          {/* availability */}
          <div className='flex gap-2 items-center pt-2'>
            <input
              type='checkbox'
              checked={profileData.available}
              onChange={() =>
                isEdit &&
                setProfileData((prev) => ({
                  ...prev,
                  available: !prev.available,
                }))
              }
              className={`w-4 h-4 border rounded cursor-pointer ${
                profileData.available ? 'accent-blue-600' : 'accent-gray-400'
              } ${!isEdit ? 'pointer-events-none opacity-100' : ''}`}
            />
            <label>Available</label>
          </div>

          {/* edit / save button */}
          {isEdit ? (
            <button
              onClick={updateProfile}
              className='px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all'
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => setIsEdit(true)}
              className='px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all'
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
