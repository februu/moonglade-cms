  <!-- System Settings -->
  <div class="w-full p-6 bg-zinc-900 rounded-lg shadow-md max-w-256">
      <h2 class="text-2xl font-semibold mb-4">System Settings</h2>
      <form class="mb-8">
          <div class="mb-4">
              <h3 class="font-medium">Change Username</h3>
              <p class="text-sm text-zinc-400 mb-4">Your current username is <span
                      class="font-semibold text-emerald-400">Admin</span>.</p>
              <div class="gap-4 flex flex-col items-end">
                  <input type="text" id="username" name="username" placeholder="New username"
                      class="w-full bg-zinc-800 border border-zinc-700 text-zinc-100 p-2 rounded-md">
                  <button type="button" class="bg-fuchsia-700 hover:bg-fuchsia-800 text-white px-4 py-2 rounded-md cursor-pointer">
                      Update Username
                  </button>
              </div>
          </div>
      </form>

      <form>
          <div>
              <h3 class="font-medium">Change Password</h3>
              <p class="text-sm text-zinc-400 mb-4">New password must be at least 8 characters and include at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.</p>
              <div class="flex flex-col items-end">
                  <div class="w-full gap-2 flex flex-col mb-4">
                      <input type="password" id="current-password" name="current-password" placeholder="Current password"
                          class="w-full bg-zinc-800 border border-zinc-700 text-zinc-100 p-2 rounded-md">
                      <input type="password" id="new-password" name="new-password" placeholder="New password"
                          class="w-full bg-zinc-800 border border-zinc-700 text-zinc-100 p-2 rounded-md">
                      <input type="password" id="confirm-password" name="confirm-password" placeholder="Confirm new password"
                          class="w-full bg-zinc-800 border border-zinc-700 text-zinc-100 p-2 rounded-md">
                  </div>
                  <button type="button" class="bg-fuchsia-700 hover:bg-fuchsia-800 text-white px-4 py-2 rounded-md cursor-pointer">
                      Update Password
                  </button>
              </div>
          </div>
      </form>
  </div>